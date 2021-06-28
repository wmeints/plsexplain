import os
import pytest
from pathlib import Path
from plsexplain.dashboard import Dashboard


@pytest.fixture()
def model_file():
    file_path = os.path.dirname(__file__)
    root_path = os.path.abspath(os.path.dirname(file_path))

    return os.path.join(root_path, "sample", "classifier.bin")


@pytest.fixture()
def missing_model_file():
    file_path = os.path.dirname(__file__)
    root_path = os.path.abspath(os.path.dirname(file_path))

    return os.path.join(root_path, "sample", "missing_classifier.bin")


@pytest.fixture()
def dataset_file():
    file_path = os.path.dirname(__file__)
    root_path = os.path.abspath(os.path.dirname(file_path))

    return os.path.join(root_path, "sample", "test.csv")


@pytest.fixture()
def missing_data_file():
    file_path = os.path.dirname(__file__)
    root_path = os.path.abspath(os.path.dirname(file_path))

    return os.path.join(root_path, "sample/missing_dataset.csv")


def test_create_dashboard(model_file, dataset_file):
    instance = Dashboard(model_file, dataset_file)

    assert not instance.data is None
    assert not instance.model is None


def test_create_dashboard_with_missing_dataset(model_file, missing_data_file):
    with pytest.raises(FileNotFoundError):
        Dashboard(model_file, missing_data_file)


def test_create_dashboard_with_missing_model(missing_model_file, dataset_file):
    with pytest.raises(FileNotFoundError):
        Dashboard(missing_model_file, dataset_file)
