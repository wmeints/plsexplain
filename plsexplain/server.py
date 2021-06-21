from os.path import dirname, abspath, join, exists
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse


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
    client_folder = join(dirname(dirname(__file__)), "client/build")
    root_file = join(client_folder, "index.html")

    asset_path = join(client_folder, sub_path)

    # We need to check if we're dealing with an existing file.
    # If we are, we serve the file instead of rewriting the request to index.html
    if exists(asset_path):
        return FileResponse(asset_path)

    # If the user requests a non-existing file we're rewriting
    # it to index.html and reading that file from disk.
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
    asset_folder = join(abspath(dirname(dirname(__file__))), "client/build/static")

    app.mount("/static", StaticFiles(directory=asset_folder), name="static")

    app.add_api_route("/{sub_path:path}", get_client_app, methods=["get"], response_class=HTMLResponse)

    return app
