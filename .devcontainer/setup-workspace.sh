#!/bin/sh

source /opt/venv/bin/activate && poetry install
cd client && npm install && cd -