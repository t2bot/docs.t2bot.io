# Downloads

The latest official builds of the media repo's binaries can be found on
[GitHub](https://github.com/turt2live/matrix-media-repo/releases). Download the one for your platform
or compile your own.

After preparing a configuration file at `/etc/matrix-media-repo/media-repo.yaml` (see configuration
section of this documentation), something similar to the following can be run:

```bash
./media_repo -config /etc/matrix-media-repo/media-repo.yaml
```

## Linux

Note that on Linux you may need to install `libde265-dev` and `libheif-dev` before MMR will
start.
