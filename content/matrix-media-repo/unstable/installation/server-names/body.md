---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Server Names

Configuring MMR to use the correct server name can be challenging. MMR requires that it be approached
with a `Host` header matching the name used in user IDs. This same server name *must* also be the name
used in the config for the homeserver.

Note that the server name is *before* delegation. You may need to override the `Host` header at the
reverse proxy before forwarding the request to MMR.
