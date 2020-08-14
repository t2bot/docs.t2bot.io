# S3

The S3 datastore is the most recommended datastore method as it allows for large amounts of data
to be stored without having to tie the host down to particular disks.

Currently the datastore is tested and validated to work with the following S3-like providers:

* Amazon AWS S3
* DigitalOcean Spaces
* MinIO
* Scaleway

A configuration for an S3 datastore would be:

```yaml
datastores:
  - type: s3
    enabled: true
    forKinds: ["all"]
    opts:
      tempPath: "/tmp/mediarepo_s3_upload"
      endpoint: sfo2.digitaloceanspaces.com
      accessKeyId: ""
      accessSecret: ""
      ssl: true
      bucketName: "your-media-bucket"
      region: "sfo2"
```

Normally, the `region` is not needed and can be commented out for most providers. Some providers, like
Scaleway, require a `region` to be set, however.

The `tempPath` is to reduce memory usage in the media repo: the underlying library used for S3
handling causes large memory usage for small files when the size is unknown, so the media repo dumps
the file to disk to get an accurate reading on the file size before sending it to S3. If memory usage
isn't a concern, set `tempPath` to an empty string. When using Docker it is acceptable (and
recommended) to leave this within the container - it does not need a volume to be mapped.

The remaining settings should all be supplied by the S3 provider, though the names of things might be
slightly different. For example, `accessKeyId` might just be an "access key" or simply "key ID".
