# Hosting providers

Hosting providers offering homeservers of any size can make use of MMR to lower costs
associated with hosting media, and to manage/report usage of the media repository.

MMR can scale horizontally to cover thousands of servers on one logical media repo. See
the "Deployment" section for more information on how to configure this setup.

A legacy architecture is to put a few hundred servers onto a single MMR instance, as MMR
previously could not horizontally scale. A Redis layer was shared across all the MMR instances
to supply a datacenter-wide cache without having to put thousands of servers onto that media
repo. Documentation for this setup is available [here](https://github.com/t2bot/docs.t2bot.io/blob/dc7f69e44d07fc436614a7486ebc7fefd1ece07d/matrix-media-repo/installing/environments/hosting.md).

## Resource requirements

Generally it is expected that hosting providers will use Docker as an installation method. CPU
requirements are generally low (4-6 cores for about 500 hosts), however disk space and memory
can be significant across all deployed instances.

To help keep individual processes working efficiently, it is recommended to deploy approximately
1 MMR instance per 500 possible hosts.

Disk space is strongly recommended to be managed with S3 or an S3-like service. Mounting a
volume is possible, though usually datacenter deployments prefer to have zero ties to physical
disks.
