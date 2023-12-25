---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Deployment

MMR sits between your reverse proxy and underlying homeserver software, such as Synapse or Dendrite.
This allows clients to continue making requests to the server without needing to know of an alternative
media handling setup.

The easiest way to deploy MMR is to route all `/_matrix/media` endpoints to the MMR process. Note that
with [MSC3911](https://github.com/matrix-org/matrix-spec-proposals/pull/3911) and [MSC3916](https://github.com/matrix-org/matrix-spec-proposals/pull/3916),
the specific set of endpoints may change.

An example NGINX config would be:

```
server {
  listen 443 ssl;
  listen [::]:443 ssl;

  # SSL options not shown - ensure the certificates are valid for your
  # homeserver deployment.

  # Redirect all traffic by default to the homeserver
  location /_matrix {
      proxy_read_timeout 60s;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_pass http://localhost:8008; # Point this towards your homeserver
  }

  # Redirect all media endpoints to MMR
  location /_matrix/media {
      proxy_read_timeout 60s;

      # Make sure this matches your homeserver in your MMR config
      # You may have to manually specify it if using delegation or the
      # incoming `Host` doesn't match.
      proxy_set_header Host $host;

      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_pass http://localhost:8000; # Point this towards media-repo
  }
}
```
