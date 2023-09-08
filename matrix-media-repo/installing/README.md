# Installing

MMR can be installed using Docker or the official binaries. Compiling it yourself is an option,
though not typically recommended.

## Requirements

The depolyment requirements vary depending on which environment you're deploying for (see
"intended environments"), however some general guidelines are:

* A modern processor with some cores available (a `t2.small` or `t2.medium` will generally be fine).
* A sizable disk or access to an S3-like service. The size depends on intended use cases.
* 1-2GB of memory, depending on configuration and usage.
