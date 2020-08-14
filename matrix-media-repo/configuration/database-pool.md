# Database pool

For most environments the default connection pool will be okay, however larger deployments may
wish to change the database pool size. The configuration for that is as follows:

```yaml
database:
    pool:
        maxConnections: 25
        maxIdleConnections: 5
```

The `maxConnections` limits the media repo's total connections, while `maxIdleConnections` is the
maximum number of connections it'll hold open when it isn't doing anything.
