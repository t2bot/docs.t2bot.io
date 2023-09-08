# Docker

After preparing a configuration file at `/etc/matrix-media-repo/media-repo.yaml` (see
configuration section of this documentation), something similar to the following can be run:

```bash
docker run \
    --rm -it \
    -p 127.0.0.1:8000:8000 \
    -v /etc/matrix-media-repo:/data \
    turt2live/matrix-media-repo:v1.3.0
```

A list of available tags can be found on
[Docker Hub](https://hub.docker.com/r/turt2live/matrix-media-repo/tags).

**Note**: Using `latest` is not recommended. Please use a tagged version instead.
