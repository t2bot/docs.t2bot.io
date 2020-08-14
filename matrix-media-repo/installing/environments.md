# Intended environments

The media repo is meant to deployed in high-traffic or high-yield environments where media
management is important for operation. This generally excludes small or individual use homeservers
as the cost of deployment is usually higher than the gains of using the media repo. Many homeservers,
such as Synapse, have a built-in media repo which works perfectly fine in most scenarios.

Medium/large homeservers and hosting providers will generally see the most gain from this project
as it de-duplicates and intelligently manages media while also providing a powerful API to get
fine-grained control over what is stored.

Smaller homeservers can still make use of this project, though are cautioned that it may be too
complicated.
