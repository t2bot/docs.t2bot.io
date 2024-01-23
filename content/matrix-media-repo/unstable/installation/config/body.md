---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Configuration

MMR's configuration is extensive and supports a wide range of features. To avoid having to restart
the process/container every time a config change is made, most options support being live reloaded
and are automatically watched. Some environments may still prefer to restart the container, however.

The configuration can additionally be split down into multiple files. This can make it easier to
keep track of within version control.

The latest version of the sample config can be found [in the GitHub repo](https://github.com/t2bot/matrix-media-repo/blob/master/config.sample.yaml).
For a specific version's sample config, please review the relevant Git tag.

Documentation for each config option is provided in the sample config file itself.

## Split Configs

A shallow directory may be used instead of a single config file to layer the config. Config files are
applied alphabetically and should be prefixed with a number to guarantee order. Each file overrides
the previous file until all files are read. MMR will not recurse into further directories.

In Docker environments, use the `REPO_CONFIG` environment variable to specify the path to the directory.
For binaries, use the `-config` command line argument.

## Per-domain Configs

Basic configuration information about each of your servers can be supplied in the main configuration,
however if an option such as maximum upload size needs to be changed on a per-domain basis, then per-domain
config files are required.

A per-domain config file is placed in the same directory as split config files. When using a per-domain
file, the `homeservers` option of the main config *should not* include the domain.

The config file then must contain the following to be considered a per-domain config file:

```yaml
homeserver: example.org
csApi: "https://example.org"
backoffAt: 10
adminApiKind: "synapse"
```

The values may of course change, but the fields do need to be present. Then, any other option which
requires overriding from the main config can then be specified. The following *cannot* be changed at
a per-domain level because they affect the entire MMR process:

* `repo`
* `federation`
* `database`
* `homeservers`
* `admins`
* `sharedSecretAuth`
* `downloads.numWorkers`
* `downloads.expireAfterDays`
* `urlPreviews.numWorkers`
* `urlPreviews.expireAfterDays`
* `thumbnails.numWorkers`
* `thumbnails.expireAfterDays`
* `rateLimit`
* `metrics`
* `redis`
* `sentry`
* `tasks`
* `pgo`
