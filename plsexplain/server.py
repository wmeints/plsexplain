from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles


def get_root():
    return {"message": "Hello World"}


def make_server(dashboard):
    app = FastAPI()
    app.add_api_route("/", get_root, methods=["get"])

    return app