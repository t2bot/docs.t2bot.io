---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Horizontal Scaling

MMR's horizontal scaling is achieved through the `MACHINE_ID` environment variable. The default machine
ID is `0`, and is responsible for all background tasks. Each deployed process *must* have a distinct
machine ID in order to function. The machine ID *must* be between `0` and `1023`, allowing for a
total of 1024 "workers".

All MMR processes *must* additionally share the same config files, database, and Redis backend. The
Redis server is used for inter-process communication. Once set up, any MMR process in the cluster can
handle any request for load balancing.

Typically, it is expected that there be roughly aligned "sub-clusters": a set of processes dedicated
to handling each of downloads, uploads, URL previews, etc. At a minimum, it is best to at least split
URL previews off to a dedicated process to avoid network request congestion. Admin APIs are best routed
to machine ID `0`.

Thumbnails are recommended to be moved to high-memory machines where possible in high-traffic environments.

The number of machines/processes needed largely depends on the number of homeservers being hosted by
a single cluster. For approximately every 500 homeservers there should be 1 additional MMR process,
rounded up (assuming each process doesn't have a dedicated purpose).

Horizontal scaling is *possible* with file-backed datastores, however all processes need to have access
to the directory at the exact same path. It is instead suggested to use exclusively S3 datastores, where
all processes can more easily fetch contents.
