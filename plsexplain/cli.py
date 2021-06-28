import click
from plsexplain.dashboard import Dashboard
import webbrowser
from threading import Thread
from time import sleep


def open_browser(url):
    """Opens the browser after a short delay to give the webserver time to boot."""

    def open_internal():
        sleep(0.5)
        webbrowser.open(url)

    Thread(target=open_internal).start()


@click.command(options_metavar="<options>")
@click.argument("model", metavar="<model>", type=click.Path("r", file_okay=True, dir_okay=False), required=True)
@click.argument("dataset", metavar="<dataset>", type=click.Path("r", file_okay=True, dir_okay=False), required=True)
@click.option(
    "--host", type=str, default="127.0.0.1", help="The host the dashboard should be hosted on (default 127.0.0.1)"
)
@click.option("--port", type=int, default=8000, help="The HTTP port to serve the dashboard on (default 8000)")
def main(model, dataset, host, port):
    """plsexplain <model> <dataset>

    Generates an explainable AI dashboard for your machine learning model stored in <model> using samples
    retrieved from <dataset>. The generated HTML report is opened in the default browser.

    We're assuming you'll provide a model stored using joblib. If the model fails to load here, you may
    want to check how you've saved your model.

    For the dataset we assume that you have a CSV file with a header that uses comma as the separator for fields.
    Please make sure you have a "outcome" column in your dataset containing the expected output of the model for
    each sample.

    The process of profiling your model will take longer when you provide a larger dataset. We recommend to keep
    the number of samples in the dataset below 500.
    """

    dashboard = Dashboard(model, dataset)
    dashboard.prepare()

    open_browser(f"http://127.0.0.1:{port}")
    dashboard.serve(host, port)


if __name__ == "__main__":
    main()
