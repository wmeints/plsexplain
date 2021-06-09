import click


@click.command(options_metavar='<options>')
@click.argument('model', metavar='<model>', type=click.File('r'))
@click.argument('dataset', metavar='<dataset>', type=click.File('r'))
@click.option('--output', help='The filename for the generated HTML report.', required=False, type=click.File('w'))
def main(model, dataset, output):
    """plsexplain <model> <dataset>

    Generates an explainable AI dashboard for your machine learning model stored in <model> using samples
    retrieved from <dataset>. The generated HTML report is opened in the default browser.
    """
    pass


if __name__ == '__main__':
    main()