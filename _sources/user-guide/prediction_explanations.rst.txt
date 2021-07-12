.. _prediction_explanations:

=======================
Prediction Explanations
=======================

In this section, we'll cover prediction explanations in the dashboard. We'll discuss when to use prediction explanations
and how to interpret the explanations.

Prediction breakdown
--------------------
When you select a prediction in the dashboard, we calculate a prediction breakdown. This breakdown shows the
contribution of individual features towards the output of the model for the selected sample. 

When to use the prediction breakdown
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
You can use the prediction breakdown plot to determine what features contributed the most to the outcome for a specific
sample. The breakdown of a prediction is helpful in case you find that the model produces an unexpected result.
The breakdown can provide valuable insights into what happened when the model made the prediction.

For example, the breakdown can show you when a feature has a value considered an outlier and therefore causes the model
to misbehave. You can use the prediction breakdown to explain the output of a model to a customer. We recommend adding
an explanation for features that stand out in the prediction to make the explanation more intuitive. 

How to interpret the prediction breakdown
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Let's take a look at a sample breakdown plot to learn how to interpret it. The sample below demonstrates a prediction
made by a classification model for credit card defaulters:

.. figure:: ../_static/prediction-breakdown.png

We consider the features in the order that they appear in the plot. In the example, we start with LIMIT_BAL, then move
on to PAY_AMT1 and PAY_AMT2. 

The model has an average output value of 0.23 (the intercept of the model). The LIMIT_BAL contributes positively to the
outcome of the model. The PAY_AMT1, and PAY_AMT2, also contribute towards a positive outcome of the model. However, the
BILL_AMT2 feature contributes towards a more negative outcome of the model.

From the plot, we can conclude that the LIMIT_BAL feature significantly influences the model's output. At the same time,
the PAY_AMT* features don't contribute as much but are still important.

If you're interested in learning more about the underlying prediction breakdown algorithm, we recommend reading the
section `Breakdown plots for interactions`_.

Feature profiles
----------------
When you've used the feature profiles in the Model explanation section, you'll be familiar with them on a model level.
However, the feature profiles on a prediction level are slightly different as we're now using them as a form of what-if
analysis.

When to use feature profiles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Since you can use the feature profiles as a what-if scenario, you can see what happens if you change a value for one
feature in the model. The feature profile can be helpful in cases where the model misbehaves. 

Doing a what-if analysis using the feature profile can also help customers understand what they need to change to get
a different model outcome. For example, if you have a machine-learning model for loan application approval, it can be
helpful to provide the customer with feedback about their case. Using the feature profile, you can explain to the
customer what would have given a different outcome.

Interpreting the feature profiles
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
When you look at the feature profile for a prediction, you'll get a plot with the value for the selected feature on the
horizontal and the outcome of the model on the vertical axis.

.. figure:: ../_static/prediction-feature-profile.png

The line represents the change in outcome given a value for the feature. Note that you can find the current value as a
dot on the plot. 

In the example plot, we can see that if the value for PAY_1 changes from 0 to 1, the model's output changes from 0.35 to
a value well above 0.4. This means that the model is moving towards a prediction that the customer will not be approved
when that customer has a positive value for PAY_1.


.. _Breakdown plots for interactions: https://ema.drwhy.ai/iBreakDown.html
