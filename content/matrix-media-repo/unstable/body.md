---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Matrix Media Repo

MMR is a highly configurable multi-domain media repository for Matrix servers. Primarily intended for
large homeservers or hosting providers, MMR deduplicates media at the storage level when possible and
generally aims to be as performant as possible.

If you are a small or medium-sized server, the built-in media repository that comes with your server
software (like Synapse, Dendrite, or Conduit) will likely be perfectly fine. MMR is *not* intended to
be used in these environments.

**If you're looking for an S3 connector, please consider using [synapse-s3-storage-provider](https://github.com/matrix-org/synapse-s3-storage-provider) instead.**

A high level of knowledge regarding the Matrix homeserver stack is assumed in operating an MMR instance.

For help and support, please visit [#media-repo:t2bot.io](https://matrix.to/#/#media-repo:t2bot.io)
on Matrix.
