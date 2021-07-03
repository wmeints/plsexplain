.. _model_explanations:

==================
Model explanations
==================

`Permutation Feature Importance`_
`````````````````````````````````
This technique allows the tool to visualize the impact on the performance of a 
model when you permutate the values of a single feature. The performance impact is measured by using a suitable 
performance metric. 

In the case of a classification model we'll use the accuracy metric. In the future you can specify the metric as an 
option on the command-line.

For regression models the `RMSE metric`_ is used. This metric too can't be changed at this moment.

`Accumulated Local Effects`_
````````````````````````````
When you select a feature in the dashboard, it will automatically plot the Accumulated Local Effects for the selected 
feature. This plot tells you more about the impact on the outcome of a model based on the change of value for the 
selected feature.

.. _Permutation Feature Importance: https://christophm.github.io/interpretable-ml-book/feature-importance.html
.. _Accumulated Local Effects: https://christophm.github.io/interpretable-ml-book/ale.html
.. _RMSE metric: https://en.wikipedia.org/wiki/Root-mean-square_deviation