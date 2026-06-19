FROM python:3.13-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       curl \
       ca-certificates \
       git \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install --upgrade pip setuptools wheel
RUN python -m pip install duckdb==1.5.4 pytz streamlit

# Install Bruin using the official binary installer for linux/arm64
RUN curl -fsSL https://raw.githubusercontent.com/bruin-data/bruin/main/install.sh | bash -s -- -b /usr/local/bin

WORKDIR /workspace
COPY . /workspace

CMD ["bash"]
