# Project Map

This learning project is currently centered on a Bruin chess pipeline backed by DuckDB.

## Main Components

- `bruin/` is a nested Git repository containing the Bruin example work.
- `bruin/bruin-chess/pipeline.yml` defines the `chess_duckdb` pipeline.
- `bruin/bruin-chess/.bruin.yml` contains the local Bruin connections.
- `bruin/bruin-chess/assets/` contains the pipeline assets.
- `bruin/bruin-chess/query_duckdb.py` prints quick database samples.
- `bruin/bruin-chess/duckdb_gui.py` starts a Streamlit browser for the DuckDB file.

## Current Data Flow

1. Bruin runs two ingestr assets from the chess source.
2. The assets load `games` and `profiles` into DuckDB.
3. `player_summary.sql` builds a summary table with game and win-rate metrics.
4. Python helper scripts inspect or browse the resulting `chess.db` file.

## Useful Commands

```sh
docker compose run --rm bruin bash
cd bruin/bruin-chess
bruin validate pipeline.yml
bruin run pipeline.yml
python query_duckdb.py
streamlit run duckdb_gui.py --server.port=8501 --server.headless=true
```
