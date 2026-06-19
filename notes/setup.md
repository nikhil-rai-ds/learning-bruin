# Setup Notes

## Environment

- Date started: 2026-06-19
- Python: system Python 3.14 (workspace venv), optional conda Python 3.13 available
- Bruin package: `bruin==0.3.3`
- DuckDB package: `duckdb==1.5.4`
- Status: `duckdb` is straightforward to install; `bruin` currently fails because `lxml==4.6.3` must be built from source on macOS.

## Commands

```sh
# Create workspace virtual environment
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel

# Install DuckDB only (clean path)
python -m pip install duckdb==1.5.4

# Install Brew native libs for lxml (needed by Bruin)
brew install pkg-config libxml2 libxslt
export LDFLAGS="-L/opt/homebrew/opt/libxml2/lib -L/opt/homebrew/opt/libxslt/lib"
export CPPFLAGS="-I/opt/homebrew/opt/libxml2/include -I/opt/homebrew/opt/libxslt/include"
export PKG_CONFIG_PATH="/opt/homebrew/opt/libxml2/lib/pkgconfig:/opt/homebrew/opt/libxslt/lib/pkgconfig"

# Try Bruin install after native build deps are present
python -m pip install bruin==0.3.3

# Save installed packages
python -m pip freeze > requirements.txt
```

## Notes

- Bruin currently pulls many dependencies because it depends on `lxml` and older Python packaging.
- On macOS, `lxml` needs `libxml2` and `libxslt` from Homebrew plus a compiler.
- If you want the cleanest path, install only `duckdb` first and add `bruin` later.
- If `bruin` still fails, use a Python version with available lxml wheels or a conda environment.
- 
