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

    def _load_model(self):
        self.model = joblib.load(self.model_file)
