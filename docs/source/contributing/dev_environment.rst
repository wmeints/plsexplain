.. _dev_environment:

=======================
Development environment
=======================

In this section we'll explain how to configure your machine to develop new features and fix bugs in plsexplain.

System requirements
-------------------
To make changes to the code, you'll need the following on your system:

- `Docker`_
- `Visual Studio Code`_

Make sure you have the `Remote containers extension` for Visual Studio Code installed.

Opening the solution
--------------------
The code for plsexplain is self-contained in a Docker container. That's why you only need Docker and Visual Studio Code
to work on this product. We recommend you follow these steps:

- Clone the code from :code:`https://github.com/wmeints/plsexplain`
- Open the :code:`plsexplain` folder in Visual Studio Code
- Press ``Ctrl+Shift+P`` and select *Remote-Containers: Reopen in Container*

The last step will build the docker container, and setup all the dependencies. After this is done you can start writing
code and testing changes. By default we open port :code:`3000` and :code:`8000` so you can run the frontend and backend
inside the development container.

Solution structure
------------------
The solution is roughly split into two components, a client, and a python package that hosts the compiled resources
from the client package. The solution is structured as follows::

    ├───.devcontainer           # Development environment configuration
    ├───.github                 # Github configuration
    ├───assets                  # Images used in the README file
    ├───client                  # Client code used in the dashboard
    ├───docs                    # Documentation source code
    ├───plsexplain              # Python source code
    ├───sample                  # Sample models and datasets
    └───tests                   # Test code for the python module

.. _Docker: https://www.docker.com/products/docker-desktop
.. _Visual Studio Code: https://code.visualstudio.com
.. _Remote containers extension: https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers
