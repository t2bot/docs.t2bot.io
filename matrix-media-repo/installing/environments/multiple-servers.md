# Multiple servers

When several servers are being operated by the same entity, it can be beneficial to use a media
repo which de-duplicates across all the available hosts. For example, an organization which has
departmental homeservers will generally have a single media repo deployment which serves media
for all of the homeservers in the organization.

An architecture diagram for this style of deployment would be:

![media-repo-collective.png](../../img/media-repo-collective.png)

Note that the media repo will still make requests to the homeserver, and thus will need appropriate
access to them.

## Resource requirements

Deployments taking this shape usually rely on Docker or binaries on a dedicated host near the
homeserver instances.

Much like medium/large deployments, the CPU requirements are minimal (1-2 cores should be fine),
and the memory requirements can be calculated by referencing the configuration section of this
documentation. Disk space requirements can be mitigated with S3 or an S3-like service, or by
referencing the configuration section of this documentation.
