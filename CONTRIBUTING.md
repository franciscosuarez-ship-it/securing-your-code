## Contributing

[fork]: https://github.com/github-samples/securing-your-code/fork
[pr]: https://github.com/github-samples/securing-your-code/compare
[code-of-conduct]: CODE_OF_CONDUCT.md

Hi there! We're thrilled that you'd like to contribute to this project. Your help is essential for keeping it great.

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE.md).

Please note that this project is released with a [Contributor Code of Conduct][code-of-conduct]. By participating in this project you agree to abide by its terms.

## Prerequisites for running and testing code

There are no prerequisites for running and testing code in this repository.

## Security expectations for contributions

Because this repository is used for security training, many insecure behaviors are intentionally present. When contributing:

1. Keep documentation and code comments explicit about whether behavior is **intentional for training** or **recommended for hardening**.
2. Do not add real credentials, private keys, API tokens, or production connection strings to the repository (including tests, fixtures, and screenshots).
3. For security-related pull requests, include rollout impact notes when behavior changes can affect challenge availability or lab operator workflows.
4. Keep validation and authorization changes consistent with existing route guards/middleware patterns in `server.ts` and clearly describe any new enforcement points.

## Submitting a pull request

1. [Fork][fork] and clone the repository
2. Make your change
3. Push to your fork and [submit a pull request][pr]
4. Pat your self on the back and wait for your pull request to be reviewed and merged.

- Keep your change as focused as possible. If there are multiple changes you would like to make that are not dependent upon each other, consider submitting them as separate pull requests.
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html).

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://help.github.com/articles/about-pull-requests/)
- [GitHub Help](https://help.github.com)