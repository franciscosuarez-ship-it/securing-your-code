/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'
import { UserModel } from '../models/user'
import challengeUtils = require('../lib/challengeUtils')
import * as utils from '../lib/utils'

const security = require('../lib/insecurity')
const cache = require('../data/datacache')
const challenges = cache.challenges

module.exports = function changePassword () {
  return (req: Request, res: Response, next: NextFunction) => {
    const currentPassword = typeof req.query.current === 'string' ? req.query.current : undefined
    const newPassword = typeof req.query.new === 'string' ? req.query.new : undefined
    const repeatPassword = typeof req.query.repeat === 'string' ? req.query.repeat : undefined
    if (!newPassword || newPassword === 'undefined') {
      res.status(401).send(res.__('Password cannot be empty.'))
    } else if (newPassword !== repeatPassword) {
      res.status(401).send(res.__('New and repeated password do not match.'))
    } else {
      const token = utils.jwtFrom(req)
      const loggedInUser = token && security.verify(token) ? security.authenticatedUsers.get(token) : undefined
      if (loggedInUser !== undefined) {
        if (currentPassword && security.hash(currentPassword) !== loggedInUser.data.password) {
          res.status(401).send(res.__('Current password is not correct.'))
        } else {
          UserModel.findByPk(loggedInUser.data.id).then((user: UserModel | null) => {
            if (user != null) {
              user.update({ password: newPassword }).then((user: UserModel) => {
                challengeUtils.solveIf(challenges.changePasswordBenderChallenge, () => { return user.id === 3 && !currentPassword && user.password === security.hash('slurmCl4ssic') })
                res.json({ status: 'success' })
              }).catch((error: Error) => {
                next(error)
              })
            }
          }).catch((error: Error) => {
            next(error)
          })
        }
      } else {
        next(new Error('Blocked illegal activity by ' + req.socket.remoteAddress))
      }
    }
  }
}
