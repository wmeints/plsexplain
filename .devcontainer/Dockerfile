FROM python:3.8 as base

ARG INSTALL_ZSH="true"
ARG UPGRADE_PACKAGES="true"
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USER_UID

ENV PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_PATH=/opt/poetry \
    VENV_PATH=/opt/venv \
    POETRY_VERSION=1.1.6

COPY .devcontainer/library-scripts/*.sh .devcontainer/library-scripts/*.env /tmp/library-scripts/

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get purge -y imagemagick imagemagick-6-common \
    && bash /tmp/library-scripts/common-debian.sh "${INSTALL_ZSH}" "${USERNAME}" "${USER_UID}" "${USER_GID}" "${UPGRADE_PACKAGES}" "true" "true" \
    && apt-get autoremove -y && apt-get clean -y && rm -rf /var/lib/apt/lists/*

ENV PIPX_HOME=/usr/local/py-utils \
    PIPX_BIN_DIR=/usr/local/py-utils/bin
ENV PATH=${PATH}:${PIPX_BIN_DIR}

RUN bash /tmp/library-scripts/python-debian.sh "none" "/usr/local" "${PIPX_HOME}" "${USERNAME}" \ 
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

ENV PATH="$POETRY_PATH/bin:$VENV_PATH/bin:$PATH"

ARG INSTALL_NODE="true"
ARG NODE_VERSION="16"

ENV NVM_DIR=/usr/local/share/nvm
ENV NVM_SYMLINK_CURRENT=true \
    PATH=${NVM_DIR}/current/bin:${PATH}

RUN if [ "$INSTALL_NODE" = "true" ]; then bash /tmp/library-scripts/node-debian.sh "${NVM_DIR}" "${NODE_VERSION}" "${USERNAME}"; fi \
    && apt-get clean -y && rm -rf /var/lib/apt/lists/*

RUN rm -rf /tmp/library-scripts
RUN apt-get update && apt-get install --no-install-recommends -y curl build-essential git
RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python \
    && mv /root/.poetry $POETRY_PATH \
    && poetry --version \
    && python -m venv $VENV_PATH \
    && poetry config virtualenvs.create false \
    && rm -rf /var/lib/apt/lists/*

RUN chown -R ${USERNAME}:${USERNAME} $NVM_DIR
RUN chown -R ${USERNAME}:${USERNAME} $POETRY_PATH
