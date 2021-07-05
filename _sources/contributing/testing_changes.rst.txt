.. _testing_changes:

===============
Testing changes
===============

In this section of the guide we focus on testing changes before submitting a pull request. We'll cover how to write
unit-tests for the python backend and the typescript frontend.

Testing python code
-------------------
We use `pytest`_ as the unit-testing framework for Python code. We recommend you take a look at the `pytest`_
documentation if you're unfamiliar with how this framework works.

Running the python tests
^^^^^^^^^^^^^^^^^^^^^^^^^
The python tests are run using the following poetry command 

.. code-block:: 

    poetry run pytest

Naming conventions
^^^^^^^^^^^^^^^^^^
In general we follow this naming pattern for files: :code:`tests/test_<module>.py`. 
Tests themselves follow this naming convention: :code:`test_<snake_cased_description>`.

You can always check other tests to find out what the naming of a test case should look like.

Using fixtures
^^^^^^^^^^^^^^
The `pytest`_ framework allows the use of `fixtures`_ to provide the test with mocks and stubs. We highly recommend
using fixtures as they make the code much more readable and maintainable.

Using parameterized tests
^^^^^^^^^^^^^^^^^^^^^^^^^
We also recommend that you parameterize tests where it makes sense. For example, if you're testing a single function
with multiple input arguments that should return a specific result. 

You can read more about parameterizing tests in `the documentation`_

Testing typescript code
-----------------------
The application features a frontend written using React and Typescript. This code is tested using Jest. 
You can learn more about jest and jasmine in the `Jest documentation`_.

Running typescript tests
^^^^^^^^^^^^^^^^^^^^^^^^^

You can run the typescript tests using the following command:

.. code-block:: shell

    cd client && npm test && cd -

Naming conventions
^^^^^^^^^^^^^^^^^^
The unit-tests in the :code:`client` folder are named after the module they test.
For example, :code:`App.tsx` has a test file :code:`App.spec.tsx` with the associated unit-tests. This makes it easier
to find the tests in the frontend.

We recommend giving tests a descriptive name, for example:

.. code-block:: javascript

    test('Renders App correctly', () => {});
 
The tests are automatically grouped on their file name, so we can see which rendering test belongs to which component.
It's best to keep the test names a short as possible, but still clear to other developers working on the code.

Mocking and stubbing
^^^^^^^^^^^^^^^^^^^^^
We recommend using mocks and stubs for replacing external dependencies. You can learn more about mocks and stubs in
`the docs <https://jestjs.io/docs/mock-functions>`_.

Testing React components
^^^^^^^^^^^^^^^^^^^^^^^^
We use snapshot testing for React components using `Enzyme`_ this makes it easier to render shallow and deep versions
of components. We recommend using `shallow rendering`_ if you can. This makes the test faster and more precise. 

.. _pytest: https://docs.pytest.org/en/6.2.x/contents.html
.. _fixtures: https://docs.pytest.org/en/6.2.x/fixture.html
.. _the documentation: https://docs.pytest.org/en/6.2.x/parametrize.html
.. _Jest documentation: https://jestjs.io/
.. _Enzyme: https://enzymejs.github.io/enzyme/
.. _shallow rendering: https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/shallow.html