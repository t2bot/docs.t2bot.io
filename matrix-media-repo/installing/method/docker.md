# Docker

After preparing a configuration file at `/etc/matrix-media-repo/media-repo.yaml` (see configuration
section of this documentation), something similar to the following can be run:

```bash
docker run \
    --rm -it \
    -p 8000:8000 \
    -v /etc/matrix-media-repo:/data \
    turt2live/matrix-media-repo:latest
```

A list of available tags can be found on
[Docker Hub](https://hub.docker.com/r/turt2live/matrix-media-repo/tags).
