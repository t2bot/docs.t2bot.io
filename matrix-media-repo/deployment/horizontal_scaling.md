# Horizontal scaling

MMR's horizontal scaling is achieved through the `MACHINE_ID` environment variable. The default
machine ID is `0`, and is responsible for running background tasks. Each deployed process *must*
have a unique machine ID, otherwise upload conflict can occur. `MACHINE_ID` is a number between
`0` and `1023`.

The MMR processes communicate with each other over Redis. All deployed MMR instances *must* use
the same configuration files, Redis servers, and database. Once running, traffic can be routed
in whatever way makes sense for your use-case. For example, routing admin APIs to machine 0,
uploads to machines 1-10, downloads and thumbnails to 11-20, and everything else to 21-25.

It is typically recommended to at least move URL previews (`/_matrix/media/.*/preview_url`) to
dedicated MMR instances. URL previews tend to have high traffic and short request times, leading
to resource consumption.

Thumbnails can additionally cause higher than average memory spikes due to image manipulation.
Moving thumbnails to dedicated instances is recommended.

As a general rule of thumb, for every 500 homeservers in a datacenter there should be 1 MMR
instance. For example, if you have 1736 servers then there should be 4 MMR instances (3.472
rounded up).

If using file datastores, the directories must be kept in sync for all MMR instances. For
example, if the logical MMR cluster is spread over 5 boxes, all 5 boxes will need to have
the exact same directory contents. For this reason, it is strongly recommended to exclusively
use S3 datastores when using horizontal scaling.

## Upgrades & high availability

Typically in an environment where horizontal scaling is used there's also a desire for zero
downtime. Typically, uploading large fleets of processes can be a challenge if uptime is a
concern.

Starting with v1.3.0, MMR can run side-by-side with different versions of itself, enabling
rolling upgrades and high availability infrastructure.

For a given version number `X.Y.Z`, the following applies:

* A change in `X` indicates a *breaking* change to MMR. The entire cluster *should* be brought
  offline to perform the upgrade. Check the upgrade notes for further guidance on zero-downtime
  upgrades to this version.
* A change in `Y` indicates a *large but backwards compatible* change to MMR. The cluster should
  be upgraded quickly, but does not need to be taken offline first.
* A change in `Z` indicates a *patch or otherwise small backwards compatible* change to MMR.
  The cluster can be upgraded more slowly, and does not need to be taken offline first.

**In all cases, ensure machine ID `0` is upgraded & restarted first.** The remaining machines
can be upgraded/restarted in any order.
