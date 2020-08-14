# Split configs/per-domain

The media repo can be pointed to a directory with several configuration files in it to allow
for split configurations. This is useful as a layering mechanism as well as being able to
supply per-domain configs in more complicated environments.

The configuration directory can be specified using `-config /path/to/config/dir` for the binaries
and through the `REPO_CONFIG` environment variable in Docker. All files will be automatically watched
for changes to live-reload them.

## Structure

Configuration directories are shallow and do not recurse - put all your files in a single directory
and do not nest them into further directories. The order the files are read is alphabetical, and so
it is recommended to prefix the files with a number for predictable ordering.

Files override each other unless they are indicated as a per-domain config (see below). The media
repo will always start with a default configuration then apply all the configuration files one by
one over top of that, leading to the final configuration it will use.

## Per-domain configs

Per-domain configs allow for more fine-tuned control over options for each individual homeserver.
Usually this will be most utilized by hosting providers which offer product packages for fewer
restrictions or more features.

When using per-domain configs, the `homeservers` field of the main config can be safely ignored -
the media repo will determine what needs to be there based on the per-domain configs it sees.

A per-domain config must have a `homeserver` field set to identify it as different from the main
config. An example minimal configuration would be:

```yaml
homeserver: example.org
csApi: "https://example.org"
backoffAt: 10
adminApiKind: "matrix"
```

Note that `csApi`, `backoffAt`, and `adminApiKind` are all the same options that would be found
in the `homeservers` field of the main config.

Any option not in the following list can be specified in the per-domain config to change the setting
for just that domain:

* `homeservers` - because why would you.
* `database` - because the database is for the whole process.
* `repo` - because the listener configuration is for the whole process.
* `sharedSecretAuth` - because the option doesn't apply to a particular domain.
* `rateLimit` - because this configuration is applied before the host is known.
* `metrics` - because this affects the whole process.
* `admins` - because admins are repo-wide.
* `downloads.cache` - because the cache is repo-wide.
* `downloads.numWorkers` - because workers are configured repo-wide.
* `urlPreviews.numWorkers` - because workers are configured repo-wide.
* `thumbnails.numWorkers` - because workers are configured repo-wide.
* `federation` - because the federation options are repo-wide.
* `downloads.expireAfterDays` - because remote media downloads are not for any particular domain.
* `thumbnails.expireAfterDays` - because thumbnails aren't associated with any particular domain.
* `urlPreviews.expireAfterDays` - because previews aren't associated with any particular domain.
* `featureSupport.IPFS.builtInDaemon` - because spawning multiple daemons doesn't make sense.
* `featureSupport.redis` - because the cache is repo-wide.

An example configuration structure could be:

`01-main.yaml`:

```yaml
repo:
    bindAddress: 127.0.0.1
    port: 8000
identicons:
    enabled: false
# ... and other options
```

`example.org.yaml`:

```yaml
homeserver: example.org
identicons:
    enabled: true
```

In this example, the default for all homeservers is to have identicons disabled while for
`example.org` they will be enabled.
