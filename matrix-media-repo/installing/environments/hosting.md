# Hosting providers

Hosting providers offering homeservers of any size can make use of this project to lower costs
associated with hosting media, and to manage/report usage of the media repository.

For single region or single datacenter structures, the "Multiple Servers" environment will be a
better fit.

For more complicated structures, such as multi-region or size differences in the offering, the
following infrastructure diagram might apply:

![media-repo-hosting-providers.png](../../img/media-repo-hosting-providers.png)

Each cluser is essentially a "Multiple Servers" style deployment with a shared cache layer across
the entire DC or region. This cache layer can be used by the media repo instances to more easily share
media across clusters within the DC/region. The media repos might still duplicate media between
themselves, however this is generally better than trying to set up a single media repo for thousands
of servers.

In general it is recommended to keep the number of servers associated with a single media repo to
less than 250. Keeping the number below 100 is even more ideal due to traffic considerations.

## Resource requirements

Generally it is expected that hosting providers will use Docker as an installation method. CPU
requirements are generally low (1-2 cores for a few dozen hosts), however disk space and memory
can be significant.

To help manage memory requirements, it is strongly recommended to use Redis as a caching layer
for the media repo. This puts the memory requirement on Redis and not the media repo, allowing for
lighter cluster deployments.

When using Redis, the media repo's maximum memory usage can be estimated by multiplying the maximum
upload size by 6. For example, if your maximum upload size is 100mb then your media repo should be
under 600mb of memory at all times (it may go above or below that - adjust as needed).

When not using Redis, see the configuration section of this documentation for estimating memory
usage.

Disk space is strongly recommended to be managed with S3 or an S3-like service. Mounting a volume
is possible, though usually cluster deployments prefer to have zero ties to physical disks.
