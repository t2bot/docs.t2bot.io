# Deployment

MMR must run behind a reverse proxy in order to support SSL/TLS - it does not have
configuration options for enabling this on its own.

The reverse proxy *must* pass through the `Host` header to MMR such that it matches
a domain specified in the config. For example, if your homeserver's name is `example.org`, then
MMR *must* receive `Host: example.org` regardless of how the request got to the reverse
proxy.

An example scenario where the `Host` header can change is in server delegation (common in
hosting providers): the `Host` the reverse proxy is approached with might not match the server
name and thus will need to manually rewrite the `Host` header being proxied to MMR.

Other proxy headers, like `X-Forwarded-For`, are recommended to be sent to MMR for
identification in the logs. In the specific case of `X-Forwarded-For`, for any requests MMR
needs to make to the homeserver it will do so with the `X-Forwarded-For` header applied to
help ensure that the user's IP history doesn't reveal MMR's IP address.

Cache headers and other response headers should be left managed by MMR and not
intercepted or changed by the reverse proxy (except `Server`, that can be safely overwritten).
