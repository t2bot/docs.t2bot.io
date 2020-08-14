# Federation

The media repo does federated API calls to get remote media, though doesn't have many options
to configure this behaviour. In general, to control outbound federation on the media repo, use a
custom DNS server or prevent inputs to the media repo that would cause outbound federation.

Configuration:

```yaml
federation:
    backoffAt: 20
```

The `backoffAt` setting controls how many consecutive failures it takes for the media repo to stop
calling the homeserver for a short time. Note that 404 errors are not considered a failure.
