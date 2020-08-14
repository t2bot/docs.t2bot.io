# Logging

The media repo will always output to stdout regardless of configuration settings. For Docker
this means the built-in Docker logging can be relied upon.

The media repo can also output to a file that rotates daily and keeps the last 14 days. Here's
the configuration for that:

```yaml
repo:
    logDirectory: "./logs"
```

By specifying `"-"` (including quotes) as the `logDirectory`, the media repo will only output to
stdout.
