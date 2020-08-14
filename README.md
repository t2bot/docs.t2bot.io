# docs.t2bot.io

Documentation for projects related to t2bot.io, such as media repo or Dimension administration. For
documentation on using/setting up t2bot.io's integrations, use [t2bot.io](https://t2bot.io).

This project is built off of [mdBook](https://rust-lang.github.io/mdBook/index.html).

## Structure

Each project has its own dedicated book in a subdirectory. All the books are published to `./books`
at the repository root. The thin wrapper for the frontend to the bookshelf is at `./bookshelf`.

A template book is provided at `./template`.

When adding a new book, be sure to update the dockerfile.

## Usage

This is intended to be deployed using docker:

```bash
docker run --rm -it -p 80:80 t2bot/docs.t2bot.io
```
