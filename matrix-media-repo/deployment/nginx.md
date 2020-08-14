# Example: nginx

Configuring nginx to proxy your homeserver alongside the media repo is fairly simple with
just a few proxy directives. Assuming your client and federation APIs are handled by the
same `server` block, the following can be used as a reference:

```ini
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

  # Redirect all media endpoints to the media-repo
  location /_matrix/media {
      proxy_read_timeout 60s;

      # Make sure this matches your homeserver in media-repo.yaml
      # You may have to manually specify it if using delegation or the
      # incoming Host doesn't match.
      proxy_set_header Host $host;

      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $remote_addr;
      proxy_pass http://localhost:8000; # Point this towards media-repo
  }
}
```
