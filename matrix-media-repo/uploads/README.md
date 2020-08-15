# Uploads

Uploads for the media repo get processed through a number of stages, which include buffering
them into memory for processing. This can cause high memory usage if not carefully managed.

The configuration for uploads is:

```yaml
uploads:
    maxBytes: 104857600 # 100MB default, 0 to disable
    reportedMaxBytes: 104857600
    minBytes: 100
```

The `maxBytes` control the maximum size being uploaded, with zero disabling the limitation (not
recommended). `reportedMaxBytes`, if supplied, will be used to inform the user of the maximum file
size they can upload. Typically the `reportedMaxBytes` option is not needed outside of rare
circumstances. When `reportedMaxBytes` is zero (the default), it'll use `maxBytes`. When it is `-1`,
it will indicate that there is no limit to users.

`minBytes` is a minimum size users must upload for the media repo to make it worthwhile processing
the upload. The media repo has to spend time and energy processing and storing each file, and small
files often cost more to process/store than it is worth. 100 bytes (the default) is an approximate
break-even point for balancing cost vs minimum file size.

## Reverse proxies

Often reverse proxies will impose maximum client request sizes which may be different from the maximum
allowable bytes in your config. Check your reverse proxy's configuration to ensure that it will not
be imposing an artificially small limit on your users.

If your environment is intentionally set up to disallow large file uploads from your users, but have
a higher limit internal to your network, use the `reportedMaxBytes` option to report the reverse
proxy's limit.
