# Access token cache

The media repo verifies who is uploading a piece of media by calling the `/account/whoami` endpoint
on the homeserver over the client-server API. This can cause significant load on the homeserver if
not cached.

The full configuration for the access token cache is:

```yaml
accessTokens:
  maxCacheTimeSeconds: 0
  useLocalAppserviceConfig: false
  appservices:
    - id: Name_of_appservice_for_your_reference
      asToken: Secret_token_for_appservices_to_use
      senderUserId: "@_example_bridge:yourdomain.com"
      userNamespaces:
        - regex: "@_example_bridge_.+:yourdomain.com"
```

The access token cache is disabled by default, however if enabled it is strongly recommended to
proxy the `/logout` and `/logout/all` endpoints through to the media repo. They'll be proxied through
to the homeserver and update the cache internally. Without this, a smaller `maxCacheTimeSeconds` is
recommended. If the endpoints are being proxied, a `maxCacheTimeSeconds` of `43200` (12 hours) will
be suitable for most applications.

To enable the access token cache, set `maxCacheTimeSeconds` to a non-zero value.

Application services (bridges, normally) can be made even more efficient for the media repo by
registering some minimal information with the media repo. When `useLocalAppserviceConfig` is `true`,
the media repo will accept requests which would be valid under the `appservices` list without
verifying with the homeserver, leading to fewer requests though increasing the risk of media being
uploaded for users which do not exist. It's important to only use this option with a trustworthy
bridge/appservice as otherwise the media repo could become an abuse vector.

Each appservice has an `id` which is only used for your reference in the logs/API - this can be
set to anything that makes sense to you, such as `telegram` or `discord` for the respective bridges.
The `asToken` should be copied directly from the appservice's registration. The `senderUserId` is
a combination of the `sender_localpart` from the registration and the homeserver's domain name. The
media repo only needs to know about the `user` namespaces, and only the regular expressions contained
within.

**Note**: If the appservice generated a user namespace for `@_example.*` (ie: no domain restriction)
then it is important to add one. For example: `@_example.+:homeserver.example.org`. Without a domain
restriction in the regular expression anyone who matches the prefix could upload media from any
homeserver if they had the right `asToken`.

**Note**: If using the appservice feature, it's *strongly* recommended to only configure the
`appservices` in per-domain configs to ensure that appservices for one homeserver are not configured
for all homeservers.
