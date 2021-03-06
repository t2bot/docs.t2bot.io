# File-based

File-based datastores use a directory on the host running the media repo to house content. These
kinds of datastores are usually best for temporary storage or for frequently requested content. In
Docker environments, it is highly not advised to use this datastore type due to the requirement of
having to map volumes, which many use cases for the media repo Docker image will find impossible
or unmanagable.

When using a file-based datastore, it is recommended to use higher performance disks due to frequent
reads and writes.

The configuration for a file-based datastore is as follows:

```yaml
datastores:
  - type: file
    enabled: true
    forKinds: ["all"]
    opts:
      path: /var/matrix/media
```

The `path` is simply where the media will be placed. Note that if the path is expected to change
then a second datastore with the new path must be created, then use the datastore management APIs to
move the data. It cannot be simply copy/pasted to a new directory.
