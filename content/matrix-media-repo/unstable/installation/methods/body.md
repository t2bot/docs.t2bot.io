---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Installation Methods

The provided Docker container is the preferred deployment approach, supporting environments commonly
used by Matrix server hosting providers. It's recommended to first deploy MMR in a staging or test
environment to catch any deployment-specific variations or dependencies.

The Docker container can be run as follows:

```bash
docker run \
  --restart unless-stopped \
  -p 127.0.0.1:8000:8000 \
  -v /etc/matrix-media-repo:/data \
  docker.io/turt2live/matrix-media-repo:latest
```

There are tagged images for each release as well. It is *strongly* recommended that deployments use
a tagged release instead of `latest`.

**Note**: MMR does not have a release candidate cycle. When the release is ready to go out, it is
pushed out directly. This can mean there are bugs on release day. Please test all releases in a staging
or test environment prior to using them in production.

The last 6 weeks of releases, as well as the most recent release, are supported at any given time.

Binaries can additionally be found on each of the [GitHub releases](https://github.com/turt2live/matrix-media-repo/releases)
for use in systemd or similar. On Linux you may need a fully updated version of `libde265-dev` and
`libheif-dev`, matching the requirement of MMR. The exact requirements should be clear when starting
MMR for the first time.

If you prefer to compile the binaries yourself, please see the [developer documentation](../../developers).
