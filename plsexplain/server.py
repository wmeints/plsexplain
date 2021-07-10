"""This module implements the API endpoints for the dashboard."""

from os.path import dirname, abspath, join, isfile
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse, Response
import json


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
        return dashboard.model_performance()

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


def get_feature_importance(dashboard):
    """Retrieves the feature importance data for the model.

    Parameters
    ----------
    dashboard : plsexplain.dashboard.Dashboard

    Returns
    -------
    Callable
        The API handler for the feature importance
    """

    def get_feature_importance_internal():
        return dashboard.feature_importance.to_dict()

    return get_feature_importance_internal


def get_feature_profile(dashboard):
    """Retrieves the feature profile for a feature

    Parameters
    ----------
    dashboard : plsexplain.dashboard.Dashboard

    Returns
    -------
    Callable
        The API handler for the feature importance
    """

    def get_feature_profile_internal(name):
        graph_data = dashboard.model_profile.plot(variables=[name], show=False).to_json()
        return Response(content=graph_data, media_type="application/json")

    return get_feature_profile_internal


def get_prediction_breakdown(dashboard):
    """Retrieves the prediction breakdown

    Parameters:
    ----------
    dashboard : plsexplain.dashboard.Dashboard

    Returns
    -------
    Callable
        The API handler for the prediction breakdown
    """

    def get_prediction_explanation_internal(index):
        return dashboard.breakdown_prediction(index)

    return get_prediction_explanation_internal

def get_prediction_profile(dashboard):
    """Retrieves the prediction profile for a feature

    Parameters
    ----------
    dashboard : plsexplain.dashboard.Dashboard

    Returns
    -------
    Callable
        The API handler for the prediction profile
    """

    def get_prediction_profile_internal(index, feature):
        response_data = dashboard.profile_prediction_feature(index, feature)
        return Response(response_data, media_type="application/json")

    return get_prediction_profile_internal


def get_dataset(dashboard):
    """Retrieves the dataset

    Parameters:
    -----------
    dashboard : plsexplain.dashboard.Dashboard

    Returns
    -------
    Callable
        The API handler for the dataset
    """

    def get_dataset_internal(skip, take):
        skip = int(skip)
        take = int(take)
        data = dashboard.raw_data
        page = data.iloc[skip:skip + take, :]

        return {
            "data": page.to_dict(orient="records"),
            "pager": {"skip": int(skip), "take": int(take), "total": len(data.index)},
            "metadata": {"columns": data.columns.tolist()},
        }

    return get_dataset_internal


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

    # We don't want to send index.html for static assets, this makes sure we
    # handle this case correctly.
    if isfile(asset_path):
        return FileResponse(asset_path)

    # We need to make sure that we reply with a 404 for non-existing API endpoints.
    # Otherwise the API handlers in the client code mess up big time.
    if sub_path.startswith("api/"):
        return Response(json.dumps({"message": "Location not found."}), media_type="application/json")

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
    app.add_api_route("/api/model/features", get_feature_importance(dashboard), methods=["get"])
    app.add_api_route("/api/model/features/{name:str}", get_feature_profile(dashboard), methods=["get"])
    app.add_api_route("/api/dataset", get_dataset(dashboard), methods=["get"])
    app.add_api_route("/api/predictions/{index:int}/breakdown", get_prediction_breakdown(dashboard), methods=["get"])
    app.add_api_route("/api/predictions/{index}/profile/{feature}", get_prediction_profile(dashboard), methods=["get"])
    app.mount("/images", StaticFiles(directory=asset_folder), name="static")
    app.add_api_route("/{sub_path:path}", get_client_app, methods=["get"], response_class=HTMLResponse)

    return app
