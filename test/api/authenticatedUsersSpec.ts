/*
 * Copyright (c) 2014-2024 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import frisby = require('frisby')
import * as security from '../../lib/insecurity'
import { expect } from '@jest/globals'
import config from 'config'

const REST_URL = 'http://localhost:3000/rest'

const jsonHeader = { ContentType: 'application/json' }
const authHeader = { Authorization: `Bearer ${security.authorize({ data: { email: 'admin@juice-sh.op' } })}`, 'content-type': 'application/json' }
const expiredToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJzdWNjZXNzIiwiZGF0YSI6eyJpZCI6MSwidXNlcm5hbWUiOiIiLCJlbWFpbCI6ImFkbWluQGp1aWNlLXNoLm9wIiwicGFzc3dvcmQiOiIwMTkyMDIzYTdiYmQ3MzI1MDUxNmYwNjlkZjE4YjUwMCIsInJvbGUiOiJhZG1pbiIsImxhc3RMb2dpbklwIjoiMC4wLjAuMCIsInByb2ZpbGVJbWFnZSI6ImRlZmF1bHQuc3ZnIiwidG90cFNlY3JldCI6IiIsImlzQWN0aXZlIjp0cnVlLCJjcmVhdGVkQXQiOiIyMDE5LTA4LTE5IDE1OjU2OjE1LjYyOSArMDA6MDAiLCJ1cGRhdGVkQXQiOiIyMDE5LTA4LTE5IDE1OjU2OjE1LjYyOSArMDA6MDAiLCJkZWxldGVkQXQiOm51bGx9LCJpYXQiOjE1NjYyMzAyMjQsImV4cCI6MTU2NjI0ODIyNH0.FL0kkcInY5sDMGKeLHfEOYDTQd3BjR6_mK7Tcm_RH6iCLotTSRRoRxHpLkbtIQKqBFIt14J4BpLapkzG7ppRWcEley5nego-4iFOmXQvCBz5ISS3HdtM0saJnOe0agyVUen3huFp4F2UCth_y2ScjMn_4AgW66cz8NSFPRVpC8g'

describe('/rest/user/authentication-details', () => {
  it('GET is denied without auth token', () => {
    return frisby.get(`${REST_URL}/user/authentication-details`)
      .expect('status', 401)
  })

  it('GET is denied with malformed auth token', () => {
    return frisby.get(`${REST_URL}/user/authentication-details`, { headers: { Authorization: 'Bearer this.is-not-a-valid-jwt' } })
      .expect('status', 401)
  })

  it('GET is denied with expired auth token', () => {
    return frisby.get(`${REST_URL}/user/authentication-details`, { headers: { Authorization: `Bearer ${expiredToken}` } })
      .expect('status', 401)
  })

  it('GET all users with password replaced by asterisks', () => {
    return frisby.get(`${REST_URL}/user/authentication-details`, { headers: authHeader })
      .expect('status', 200)
      .expect('json', 'data.?', {
        password: '********************************'
      })
  })

  it('GET returns lastLoginTime for users with active sessions', async () => {
    await frisby.post(`${REST_URL}/user/login`, {
      headers: jsonHeader,
      body: {
        email: `jim@${config.get<string>('application.domain')}`,
        password: 'ncc-1701'
      }
    }).promise()

    const response = await frisby.get(`${REST_URL}/user/authentication-details`, { headers: authHeader })
      .expect('status', 200)
      .promise()

    const jim = response.json.data.find((user: any) => user.email.startsWith('jim@'))

    expect(jim).not.toBe(null)
    expect(jim.lastLoginTime).toEqual(expect.any(Number))
  })
})
