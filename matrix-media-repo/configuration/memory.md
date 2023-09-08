# Calculating memory requirements

Memory can be difficult to calculate or predict for the media repo due to the number of things
it does. For most deployments, starting with 1-2GB and adjusting as needed will get a good idea
for how much memory will be used.

A formula to get the approximate memory usage would be:

```text
75mb
+ (thumbnails.maxSourceBytes * 2)
```
