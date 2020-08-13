# Installing

The media repo can be installed using Docker, precompiled binaries, or by compiling the binaries
yourself. Which method you use depends on your environmental concerns, such as whether or not you're
a hosting provider or an organization with large amounts of media.

## Requirements

The depolyment requirements vary depending on which environment you're deploying for (see "intended
environments"), however some general guidelines are:

* A modern processor with some cores available (a `t2.small` or `t2.medium` will generally be fine).
* A sizable disk or access to an S3-like service. The size depends on intended use cases.
* 2-4GB of memory, depending on configuration and usage.
