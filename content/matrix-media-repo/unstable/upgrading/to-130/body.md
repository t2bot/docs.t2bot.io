---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Upgrading to v1.3.0

## Mandatory Configuration Change

Datastores are no longer managed by matrix-media-repo internally, meaning you MUST specify a datastore ID on each of your
configured datastores. If you're setting up matrix-media-repo for the first time then you can use whatever you want for
a datastore ID (though it's recommended to stick to alphanumeric strings). If you're *upgrading* to this version however,
you will need to pull the datastore IDs out of the matrix-media-repo and add them to your configuration.

**For safety, the datastores table is *not* deleted from the database in this upgrade. A future version may drop the table,
however.**

### Getting existing datastore IDs

**Before upgrading**, you can get your datastore IDs fairly easily. The best way might be to look at the startup log of
your media repo:

```text
INFO[2023-05-21 20:58:45.116 Z] Datastores:
INFO[2023-05-21 20:58:45.116 Z]         file (e9ce13bbb062383ce1bcee76414058668877f2d51635810652335374336): /mnt/mmr-store/location4
INFO[2023-05-21 20:58:45.117 Z]         s3 (7669e2fb8ccaa0801e4255a417ad20884f76b8611659655069202644992): s3://redacted.r2.cloudflarestorage.com/redacted
```

This way, you're able to correlate locations to IDs. For example, the `file` datastore configured to put media at
`/mnt/mmr-store/location4` has ID `e9ce13bbb062383ce1bcee76414058668877f2d51635810652335374336`. Add this as
`id: "e9ce13bbb062383ce1bcee76414058668877f2d51635810652335374336"` in your media repo config file.

Alternatively, you can use the admin API to get your datastores:

```text
curl -s -X GET -H "Authorization: Bearer YOUR_ACCESS_TOKEN" https://example.org/_matrix/media/unstable/admin/datastores
{
  "e9ce13bbb062383ce1bcee76414058668877f2d51635810652335374336": {
    "type": "file",
    "uri": "/mnt/mmr-store/location4"
  },
  "7669e2fb8ccaa0801e4255a417ad20884f76b8611659655069202644992": {
    "type": "s3",
    "uri": "s3://redacted.r2.cloudflarestorage.com/redacted"
  }
}
```

The returned object is keyed by ID over the API.

In either case, take the ID and add it to the associated datastore in your config, similar to the following:

```yaml
# Your specific configuration may be different
datastores:
  - type: file
    id: "e9ce13bbb062383ce1bcee76414058668877f2d51635810652335374336"  ## ADD THIS
    #enabled: true   ## REMOVE THIS - use `forKinds: []` to disable a datastore
    forKinds: ["archives"]
    opts:
      path: "/mnt/mmr-store/location4"
  - type: s3
    id: "7669e2fb8ccaa0801e4255a417ad20884f76b8611659655069202644992"  ## ADD THIS
    #enabled: true   ## REMOVE THIS - use `forKinds: []` to disable a datastore
    forKinds: ["all"]
    opts:
      ssl: true
      tempPath: "/mnt/mmr-store/s3-staging"
      endpoint: sfo2.digitaloceanspaces.com
      accessKeyId: "redacted"
      accessSecret: "redacted"
      bucketName: "redacted"
```

**Note**: If matrix-media-repo detects that a datastore ID is used but not referenced in the config then it will refuse
to start.

This new configuration style additionally allows for out-of-band datastore transfers. If you move all your data to a new
path/server, for example, then you can simply update the path in the config for that datastore.
