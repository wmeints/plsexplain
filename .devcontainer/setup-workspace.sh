#!/bin/bash

source /opt/venv/bin/activate && poetry install
cd client && npm install && cd -