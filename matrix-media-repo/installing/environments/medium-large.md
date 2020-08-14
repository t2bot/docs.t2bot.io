# Medium/large individual server

Homeservers which have more than 1000 Monthly Active Users (MAU) or which see an upload rate of
a steady 0.25Hz will fit this category. Other metrics to consider are how many rooms the server
is in and how much media is being shared in those rooms. For example, a homeserver may only have
a few users on it and a few uploads an hour, but might partcipate in rooms which share gigabytes
worth of media every day - those servers might still see a benefit of using this project.

For this deployment, servers will need a reverse proxy which can route media requests to the
media repo, leaving the other Matrix requests going to the homeserver. More information on this
setup can be found in the "Reverse Proxy Setup" section of this documentation.

## Resource requirements

In this setup it is usually expected that either the Docker image or binaries will be used
alongside the process running the homeserver itself. For instance, if you're using Synapse
then usually the media repo will be running on the same host alongside Synapse.

Normally the system specifications for your homeserver will have enough overhead to also run
a media repo instance.

For clarity though: the CPU requirements are usually minimal (1-2 cores), and the memory usage
can be calculated per the configuration section of this documentation. The disk requirements
can be mitigated using S3 or an S3-like service, or by referencing the configuration section of
this documentation.
