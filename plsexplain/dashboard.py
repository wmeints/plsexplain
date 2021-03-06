import pandas as pd
import joblib
import dalex as dx
import progressbar
import uvicorn
from .server import make_server


class Dashboard:
    """Creates a dashboard to host the explainer logic.

    Parameters
    ----------
    model_file : str
        The path to the model. The model should be stored using :func:`joblib.dump`
    dataset_file : str
        The path to the dataset you want to use in the explainer. Please make sure it's stored as a CSV file.
        The dataset should contain a column 'output' that contains the expected output for the sample.
        Also, make sure to use a comma as the separator in your dataset. We recommend using no more than
        500 samples in the dataset for reasonable performance.
    """

    def __init__(self, model_file, dataset_file):
        self.model_file = model_file
        self.dataset_file = dataset_file

        self._load_dataset()
        self._load_model()

    def prepare(self):
        """Prepares the dashboard for serving it in the browser.

        The preparation method performs the following steps:

        1. It loads the explainer for the model.
        2. It calculates performance figures based on the provide dataset.
        3. It calculates feature importance for the model.
        4. It calculates the ALE charts for all features.
        """

        with progressbar.ProgressBar(max_value=4, redirect_stdout=True) as progress:
            print("Initializing explainer")
            self.explainer = dx.Explainer(self.model, self.data["x"], self.data["y"], verbose=False)
            progress.update(1)

            print("Calculating model performance")
            self.performance = self.explainer.model_performance()
            progress.update(2)

            print("Calculating feature importance")
            self.feature_importance = self.explainer.model_parts(verbose=False).plot(show=False)
            progress.update(3)

            print("Calculating feature profiles")
            self.model_profile = self.explainer.model_profile(type="accumulated", verbose=False)
            progress.update(4)

    def serve(self, host, port):
        """Serves the dashboard on a HTTP port so it can be viewed by the user.

        Parameters
        ----------
        host : str
            The host the server should listen on.
        port : int
            The port the server should listen on.
        """

        app = make_server(self)
        uvicorn.run(app, host=host, port=port)

    def model_performance(self):
        model_index = self.performance.result.index[0]

        if self.performance.model_type == "classification":
            precision = self.performance.result.loc[model_index, "precision"]
            recall = self.performance.result.loc[model_index, "recall"]
            f1_score = self.performance.result.loc[model_index, "f1"]
            accuracy = self.performance.result.loc[model_index, "accuracy"]
            auc = self.performance.result.loc[model_index, "auc"]

            return {"precision": precision, "recall": recall, "accuracy": accuracy, "f1": f1_score, "auc": auc}
        elif self.performance.model_type == "regression":
            mse = self.performance.result.loc[model_index, "mse"]
            rmse = self.performance.result.loc[model_index, "rmse"]
            r2 = self.performance.result.loc[model_index, "r2"]
            mae = self.performance.result.loc[model_index, "mae"]
            mad = self.performance.result.loc[model_index, "mad"]

            return {"mse": mse, "rmse": rmse, "r2": r2, "mae": mae, "mad": mad}
        else:
            raise ValueError("The model type is not supported.")

    def breakdown_prediction(self, x):
        """Returns a breakdown of a prediction

        Parameters
        ----------
        x : int
            The index of the data sample to break down

        Returns
        -------
        dict
            A dictionary containing the breakdown of the prediction
        """
        breakdown_data = self.explainer.predict_parts(
            self.data["x"].iloc[[int(x)]], type="break_down_interactions"
        ).plot(show=False)

        return breakdown_data.to_dict()

    def profile_prediction_feature(self, index, feature):
        """Returns a profile of a feature in the model for a prediction.

        Parameters
        ----------
        index : int
            The index of the data sample to profile
        feature : str
            The name of the feature to profile

        Returns
        -------
        dict
            A dictionary containing the profile of the feature
        """
        graph_data = self.explainer.predict_profile(self.data["x"].iloc[[index]]).plot(variables=[feature], show=False)
        return graph_data.to_json()

    def _load_dataset(self):
        df = pd.read_csv(self.dataset_file)
        available_columns = [col.lower() for col in df.columns]

        if "output" in available_columns:
            self.output_column = df.columns[available_columns.index("output")]
        else:
            raise ValueError("Please include an 'output' column in your dataset.")

        self.data = {
            "x": df.drop(self.output_column, axis=1),
            "y": df[self.output_column],
        }

        self.raw_data = df
        self.raw_data["key"] = self.raw_data.index

    def _load_model(self):
        self.model = joblib.load(self.model_file)
