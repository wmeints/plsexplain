.. _installing:

==========
Installing
==========

In this we'll discuss how to install :mod:`plsexplain` on your computer. We'll cover the following topics:

.. toctree::
    :hidden:

System requirements
-------------------
You'll need the following tools on your machine to use the :mod:`plsexplain`.

* Python 3.8 or higher
* A modern webbrowser

Installing the package
----------------------

The tooling can be installed by using the following command

.. code-block:: shell
    
    pip install plsexplain

After you've installed the package you can create a new dashboard using the following command:

.. code-block:: shell

    plsexplain <model> <dataset>

Please make sure to provide the following arguments:

* :code:`model` - The path to the model stored using :mod:`joblib`.
* :code:`dataset` - The path to a dataset stored in CSV.

.. note::

    Make sure the CSV file has a header row, and uses comma as the field separator.

Now that you've learned how to create your first dashboard. Let's take a look at what the :mod:`plsexplain` tool 
has to offer.
