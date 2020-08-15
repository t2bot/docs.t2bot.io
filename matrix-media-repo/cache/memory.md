# In-process cache

The in-process cache only applies to download requests (including thumbnails) - it does not
apply to uploads.

The configuration for this cache is as follows:

```yaml
downloads:
  cache:
    enabled: true
    maxSizeBytes: 1048576000 # 1GB default
    maxFileSizeBytes: 104857600 # 100MB default
    trackedMinutes: 30
    minDownloads: 5
    minCacheTimeSeconds: 300
    minEvictedTimeSeconds: 60
```

The cache works by tracking how frequently a file is downloaded, and if it passes `minDownloads`
within `trackedMinutes` then it'll be added to the cache. The file remains in the cache for at
least `minCacheTimeSeconds` before it is elligible for eviction (due to the cache being near
the `maxSizeBytes` limit). Once evicted, the file will not be able to return to the cache for
`minEvictedTimeSeconds`. Files larger than `maxFileSizeBytes` will not be cached.

The cache generally works by preferring to keep popular media cached while preferring to have
large files cached. Usually the datastores are efficient for smaller files and thus the media
repo's in-process cache will prefer to have larger files to save bandwidth and access times.

To make the cache most effective at its job, it is best to have the `maxFileSizeBytes` be
larger than or equal to the server's maximum upload size. The `maxSizeBytes` should also be
significantly larger than the `maxFileSizeBytes`, at least 10x if possible.

When the cache is full, the media repo prioritizes removing the smallest and least popular
media first to make room for another, larger, piece of media. If no space can be made, the file
will not be cached.

## Room composition

The cache performs in the way defined above because most rooms have one of the following
approximate compositions:

* A hundred or fewer users belonging to a few servers (communities)
* Hundreds of users belonging to many servers (large communities)
* A hundred or fewer users belonging to many servers (announcement rooms)
* A handful of users belonging to any number of servers (private chats, group of friends) -
  note: the cache may not kick in for these rooms due to insufficient download counts.
  File access times should still be suitably low for participants to not notice, however.

The cache considers these cases by optimizing for the spike and followup traffic. In smaller
rooms, people are more likely to be downloading media shortly after it is posted while in
larger rooms there is an expected spike with a slow decline in download counts over time
(as people are less likely to be monitoring the room). In any case, media should be served
as quickly as possible - the cache just aims to handle the common room compositions.

Less common, but still viable, compositions are:

* Hundreds of users belonging to a few servers (not federated or large communities) -
  This is generally seen when the "entry point" to matrix is funneled through a limited
  number of servers, where stragglers from other servers are not expected. This is an
  extension of the small room composition.
* Thousands of users belonging to hundreds of servers (Matrix HQ) - This is a relatively
  rare composition and is best described as an extension of the "large room" problem
  above. Media in these rooms is likely to be cached for an extremely long time.
