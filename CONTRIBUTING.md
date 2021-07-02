# Contributing to plsexplain

We love your input! We want to make contributing to this project as easy and
transparent as possible, whether it's:

- [Reporting a bug](#reporting-a-bug)
- [Reporting security issues](#reporting-security-issues)
- [Submitting code changes](#submitting-code-changes)
- [Licensing of your code changes](#licensing-of-your-code-changes)

## Reporting a bug

Found a bug and you're not sure what to do to fix it? Please file a bug, we're
happy to help you fix it. Also, feel free to file issues for feature requests.

### Writing a great bug report

We kindly ask you to include the following details in your bug report.

- A quick summary and/or background
- What you expected would happen
- What actually happens
- Steps to reproduce

If you have log files, please include them as an attachment to the bug report.

## Reporting security issues

Please don't submit security issues as bug reports but instead contact the repo
owner through [e-mail](mailto:willem.meints@gmail.com).

## Submitting code changes

Pull requests are the best way to propose changes to the codebase. All our work
is based on [the github flow][GITHUB_FLOW]. The currently released version is
on the `main` branch. The version under development is on the `dev` branch.

Please follow these steps to submit a pull request:

1. Fork the repo and create your branch from `dev`.
2. If you've added code that should be [tested][TESTING], please include tests.
3. If you've changed APIs, make sure to update the documentation.
4. Ensure [the test suite][TESTING] passes.
5. Make sure your code [lints][TESTING].
6. Issue that pull request!

Please check [the testing guide][TESTING] to learn more on how to test various
pieces of the code base.

### Code style

We're use linting tools and `.editorconfig` to enforce a consistent code style.
This means the following:

* **For python code**  
  We use [flake8][FLAKE8] to verify code style.  
  We use [black][BLACK] to format the code in the editor.
* **For typescript code**  
  We use [eslint][ESLINT] to verify code style and formatting.

All files should have linux line-endings. This is configured using
[.editorconfig][EDITORCONFIG]. Please make sure your editor supports the use of
this file.

## Licensing of your code changes

In short, when you submit code changes, your submissions are understood to be
under the same [MIT License][LICENSE] that covers the project. Feel free to
contact the maintainers if that's a concern.

[GITHUB_FLOW]: https://guides.github.com/introduction/flow/index.html
[ISSUE_MANAGEMENT]: https://github.com/briandk/transcriptase-atom/issues
[LICENSE]: LICENSE
[TESTING]: TESTING.md
[FLAKE8]: https://flake8.pycqa.org/en/latest/
[BLACK]: https://github.com/psf/black
[ESLINT]: https://eslint.org/
[EDITORCONFIG]: https://editorconfig.org/
