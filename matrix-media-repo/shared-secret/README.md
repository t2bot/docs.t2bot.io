# Shared secret authentication

Typically used by hosting providers, shared secret authentication can be optionally enabled to
make requests as a media repo administrator without needing an account on any of the configured
homeservers. Some requests do still require an administrator on a configured homeserver, however
most of the Admin API can be used by shared secret users.

The full configuration for shared secret authentication (disabled by default) is:

```yaml
sharedSecretAuth:
  enabled: false
  token: "PutSomeRandomSecureValueHere"
```

It is strongly recommended to use a secure random value for `token` to prevent unauthorized access
to the media repo.
