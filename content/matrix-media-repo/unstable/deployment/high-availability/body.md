---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# High Availability

MMR supports horizontal scaling and by consequence high availability capabilities as well. Near-zero
downtime can be achieved by employing rolling upgrades of a horizontally-scaled cluster.

In all cases, machine ID `0` *must* be updated first, however all other processes can be updated in
any order.

For a given version number `vX.Y.Z`:

* A change in `X` indicates a *breaking change* to MMR. The entire cluster should be brought offline
  to perform the upgrade. Check the upgrade notes for further guidance on zero-downtime upgrades to
  this version.
* A change in `Y` indicates a *large but backwards compatible change* to MMR. The cluster should be
  upgraded quickly, but does not need to be taken offline first. A higher volume of errors may happen
  while the cluster is upgraded.
* A change in `Z` indicates a *patch or otherwise small backwards compatible change* to MMR. The
  cluster can be upgraded more slowly, and does not need to be taken offline first.
