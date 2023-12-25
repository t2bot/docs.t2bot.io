---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Installation

MMR sits between your reverse proxy and homeserver software, intercepting media endpoints and processing
requests itself. MMR must also be configured to reach your homeserver to validate access tokens and
other visibility checks as needed.

Servers which have less than 1000 Monthly Active Users (MAU) or are not run by a hosting provider will
have a better experience with the built-in media repository from their server software.

## Requirements

While MMR does support file-backed storage, using S3 is significantly more preferred. AWS S3, DigitalOcean
Spaces, and MinIO are all supported. Other providers *may* work, though are not supported.

Hardware requirements can vary depending on load and use case. Typically it's best to start with 2
CPU cores and 1GB of RAM, then shape resource requests accordingly.

A fast temporary disk is also highly recommended to speed up media requests. The disk can be ephemeral.
