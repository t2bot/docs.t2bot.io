FROM rust:latest AS BUILDER

RUN cargo install mdbook --no-default-features --features output --vers "^0.1.0"
WORKDIR /data

COPY . /data
RUN mkdir -p /data/books/img

RUN mdbook build ./matrix-media-repo
RUN cp -rv ./matrix-media-repo/img/* ./books/img/

# --- ---------------------------------------- ---

FROM nginx:latest

RUN mkdir -p /usr/share/nginx/html/books
COPY --from=BUILDER /data/books /usr/share/nginx/html
COPY ./bookshelf /usr/share/nginx/html
