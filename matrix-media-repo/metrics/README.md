# Metrics

The media repo can export metrics for consumption by Prometheus. The metrics listen on a distinct
interface to avoid having metrics exposed publicly, and thus the `port` cannot be the same port
for the general media repo usage.

The full configuration is:

```yaml
metrics:
  enabled: false
  bindAddress: "127.0.0.1"
  port: 9000
```

An example Grafana dashboard is available
[on GitHub](https://github.com/turt2live/matrix-media-repo/blob/master/docs/grafana.json).
