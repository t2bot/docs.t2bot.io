# Downloads (remote media)

Remote media is any media offered by a homeserver that isn't controlled by the media repo
instance. For example, if your media repo config lists `hs1.example.org` and `hs2.example.org`,
then `other-hs.example.org` will be considered remote.

The following configuration can be used to control remote media downloads:

```yaml
downloads:
  maxBytes: 104857600 # 100MB default, 0 to disable
  numWorkers: 10
  failureCacheMinutes: 5
  expireAfterDays: 0
```

The `maxBytes` value ensures that large remote media is not fetched. Normally this is set to the
same value as your upload limit for consistency.

`numWorkers` is the number of concurrent requests for external media to handle at a time. The media
repo already de-duplicates requests for the same media, though requests spanning multiple servers
or media IDs can still be made. Requests are queued if they cannot be processed concurrently. It
is recommended to increase this if you're having troubles downloading remote media, or if you're
having issues with memory usage.

Sometimes servers fail to respond (500 errors, offline, etc) and the media repo will cache failures
for a short while on particular media to give the remote server some breathing room. This breathing
room can be changed with `failureCacheMinutes`.

Remote media is often not used after a week or two of being downloaded, and can be purged with the
`expireAfterDays` option. If a client re-requests the media, it will be downloaded again.
