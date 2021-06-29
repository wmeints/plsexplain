from os.path import dirname, abspath, join, isfile
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse


def get_model_performance(dashboard):
    """Retrieves the model performance from the dashboard

    Parameters
    ----------
    dashboard : plsexplain.dashboard.Dashboard
        The dashboard instance to read from

    Returns
    -------
    Callable
        The API handler for rendering the model performance
    """

    def get_model_performance_internal():
        model_index = dashboard.performance.result.index[0]

        if dashboard.performance.model_type == "classification":
            precision = dashboard.performance.result.loc[model_index, "precision"]
            recall = dashboard.performance.result.loc[model_index, "recall"]
            f1_score = dashboard.performance.result.loc[model_index, "f1"]
            accuracy = dashboard.performance.result.loc[model_index, "accuracy"]
            auc = dashboard.performance.result.loc[model_index, "auc"]

            return {"precision": precision, "recall": recall, "accuracy": accuracy, "f1": f1_score, "auc": auc}
        elif dashboard.performance.model_type == "regression":
            mse = dashboard.performance.result.loc[model_index, "mse"]
            rmse = dashboard.performance.result.loc[model_index, "rmse"]
            r2 = dashboard.performance.result.loc[model_index, "r2"]
            mae = dashboard.performance.result.loc[model_index, "mae"]
            mad = dashboard.performance.result.loc[model_index, "mad"]

            return {"mse": mse, "rmse": rmse, "r2": r2, "mae": mae, "mad": mad}

    return get_model_performance_internal


def get_model_metadata(dashboard):
    """Retrieves the model metadata  from the dashboard

    Parameters
    ----------
    dashboard : plsexplain.dashboard.Dashboard
        The dashboard instance to read from

    Returns
    -------
    Callable
        The API handler for rendering the model metadata
    """

    def get_model_metadata_internal():
        return {"type": dashboard.performance.model_type, "class": str(dashboard.explainer.model_class)}

    return get_model_metadata_internal


def get_client_app(sub_path):
    """Retrieves content for the client app as long as it's not coming from the static folder.

    Parameters
    ----------
    sub_path : str
        The sub path that is requested by the client.

    Returns
    -------
    HTMLResponse or FileResponse
        The response from the server.
    """
    client_folder = join(dirname(dirname(__file__)), "client", "dist")
    root_file = join(client_folder, "index.html")

    asset_path = join(client_folder, sub_path)

    if isfile(asset_path):
        return FileResponse(asset_path)

    with open(root_file) as doc:
        return doc.read()


def make_server(dashboard):
    """
    Creates the server by mounting various API endpoints and static file content for the dashboard

    Parameters
    ----------
    dashboard : plsexplain.Dashboard
        The dashboard instance to server

    Returns
    -------
    FastAPI
        The application instance that hosts the dashboard instance.
    """

    app = FastAPI()
    asset_folder = join(abspath(dirname(dirname(__file__))), "client/dist/images")

    app.add_api_route("/api/metadata", get_model_metadata(dashboard), methods=["get"])
    app.add_api_route("/api/performance", get_model_performance(dashboard), methods=["get"])

    app.mount("/images", StaticFiles(directory=asset_folder), name="static")
    app.add_api_route("/{sub_path:path}", get_client_app, methods=["get"], response_class=HTMLResponse)

    return app
