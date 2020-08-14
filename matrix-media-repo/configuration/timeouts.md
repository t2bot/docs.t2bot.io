# Timeouts

The media repo has various configurable timeouts which can be specified in the config:

```yaml
timeouts:
    urlPreviewTimeoutSeconds: 10
    federationTimeoutSeconds: 120
    clientServerTimeoutSeconds: 30
```

Each is the maximum amount of time the media repo should spend waiting for resources to be
fetched. Note that federation is primarily used to download media.
