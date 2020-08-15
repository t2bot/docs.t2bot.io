# Security

URL previews can expose internal parts of your network to outsiders with specially formatted
requests. To avoid leaking data about your infrastructure, it is incredibly important to
ensure the allowable networks are configured:

```yaml
urlPreviews:
  previewUnsafeCertificates: false
  disallowedNetworks:
    - "127.0.0.1/8"
    - "10.0.0.0/8"
    - "172.16.0.0/12"
    - "192.168.0.0/16"
    - "100.64.0.0/10"
    - "169.254.0.0/16"
    - '::1/128'
    - 'fe80::/64'
    - 'fc00::/7'
  allowedNetworks:
    - "0.0.0.0/0"
```

One or both of `disallowedNetworks` and `allowedNetworks` must be supplied, otherwise the media
repo will refuse to generate previews. Both options are list of CIDR ranges.

The media repo will first check `allowedNetworks` to see if the network is allowable. By default
this is as shown above (`0.0.0.0/0`) to allow all networks to be previewed and limited by the
disallowed networks list.

If a network is allowed by the `allowedNetworks`, the media repo will then check against the
`disallowedNetworks` list to ensure the request is still safe to go through to previewing. This
is usually where private networks are specified, like in the example.

In some rare circumstances, the certificates of the sites being previewed might not be traditionally
signed or secure. If this is the case for your environment, set `previewUnsafeCertificates: true`
to disable certificate checks on previews.
