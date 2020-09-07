# Configuration

The media repo has a fairly extensive configuration structure with support for live reloading,
split configs, per-domain configs, and fine-grained control over individual features. This
section covers the minimum for configuring a media repo and does not cover feature-specific areas
of the config: those are left for other areas of this documentation.

The sample configuration can be found [on GitHub](https://github.com/turt2live/matrix-media-repo/blob/master/config.sample.yaml).

## Basic configuration

The following is the minimum required information to make use of the media repo:

```yaml
repo:
    # Generally the bind address should be local as the media repo should be
    # behind a reverse proxy.
    bindAddress: '127.0.0.1'
    port: 8000
database:
    # Currently only PostgreSQL is supported. This is *not* the same as your
    # homeserver's database.
    postgres: "postgres://your_username:your_password@localhost/database_name?sslmode=require"
homeservers:
    - name: example.org
      csApi: "https://example.org"
admins:
    - "@your_username:example.org"
datastores:
    - type: file
      enabled: true
      forKinds: ["all"]
      opts:
        path: /data/media
```

For the `homeservers`, it's important to ensure that your server is correctly represented. The `name`
*must* be the server name as it appears in your user ID. As mentioned in the deployment documentation,
this will be what the media repo expects as a `Host` header too. The `csApi` is the URL for where the
media repo can reach the homeserver for some tasks. Usually this will be the same URL used to
configure Matrix clients, though it can be internally routed if needed.

At least one datastore needs to be supplied and enabled. More information about the datastores can be
found in a later section.
