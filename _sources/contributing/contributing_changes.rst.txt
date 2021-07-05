.. _contributing_changes:

====================
Contributing changes
====================

Pull requests are the best way to propose changes to the codebase. All our work
is based on `the git flow`_. Changes are submitted through pull requests. 
The main branch can potentially be released.

Submitting a pull request
-------------------------
Please follow these steps to submit a pull request:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, please include tests.
3. If you've changed APIs, make sure to update the documentation.
4. Ensure the test suite passes.
5. Make sure your code passes the code-style checks.
6. Issue that pull request!

Please check the `testing guide <testing_changes>`_ to learn more on how to test various
pieces of the code base.

Code style
----------
We're use linting tools and `.editorconfig` to enforce a consistent code style.
This means the following:

- **For python code**  
  We use `flake8`_ to verify code style.  
  We use `black`_ to format the code in the editor.
- **For typescript code**  
  We use `eslint`_ to verify code style and formatting.

All files should have linux line-endings. This is configured using
`.editorconfig`_. Please make sure your editor supports the use of
this file.

Licensing of your code changes
------------------------------

In short, when you submit code changes, your submissions are understood to be
under the same `MIT License`_ that covers the project. Feel free to
contact the maintainers if that's a concern.

.. _the git flow: https://guides.github.com/introduction/flow/index.html
.. _`MIT License`: https://opensource.org/licenses/MIT
.. _`flake8`: https://flake8.pycqa.org/en/latest/
.. _`black`: https://github.com/psf/black
.. _`eslint`: https://eslint.org/
.. _`.editorconfig`: https://editorconfig.org/