# Calculating memory requirements

Memory can be difficult to calculate or predict for the media repo due to the number of things
it does. For most deployments, starting with 1-2GB and adjusting as needed will get a good idea
for how much memory will be used.

A formula to get the approximate memory usage would be:

```text
50mb
+ (uploads.maxBytes * 2)
+ (downloads.maxBytes * (downloads.numWorkers / 5))
+ downloads.cache.maxSizeBytes
+ (urlPreviews.maxPageSizeBytes * 2)
+ (thumbnails.maxSourceBytes * 2)
```

If URL previews are not enabled, they can be removed from the forumla. Likewise for the download
cache.

## Tips for reducing memory usage

* Pick an appropriate value for the maximum upload size. These files can be buffered into memory, so
  if your server sees a lot of uploads then memory usage can increase significantly.
* Use Redis for caching if using multiple media repos in your environment. By using Redis, the cache's
  memory usage is shared by the Redis processes and the media repos can run fairly lean.
* Increase the number of thumbnail/URL preview workers if your CPU and database have enough overhead.
  By raising the limit it means more requests can be handled concurrently, leading to more spiked
  usage and less constant demand for memory.
