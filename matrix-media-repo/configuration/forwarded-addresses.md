# Forwarded addresses

Some environments need to control how the `X-Forwarded-*` headers are handled by the media repo. By
default, the media repo validates and expects an `X-Forwarded-For` and `X-Forwarded-Host` header from
the reverse proxy, though this can be disabled with the options below.

Configuration:

```yaml
repo:
    trustAnyForwardedAddress: false
    useForwardedHost: true
```

To disable all handling of `X-Forwarded-Host`, set `useForwardedHost` to `false`. Note this might be
required when using the Kubernetes nginx ingress controller, per issue [#202](https://github.com/turt2live/matrix-media-repo/issues/202).

To disable validation of the `X-Forwarded-For` header, accepting the value verbatim, set
`trustAnyForwardedAddress` to `true`. This is typically useful in scenarios where the clients being
proxied are on a private network which the media repo might ignore as potentially invalid.
