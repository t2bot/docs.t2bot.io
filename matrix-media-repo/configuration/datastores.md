# Datastores

Datastores are where the media repo puts content for later usage. All uploads, thumbnails, remote
media, URL preview images, etc are stored in a datastore and recorded in the database. On most
deployments these datastores can get to be hundreds of gigabytes in size, with the largest deployments
seeing in excess of 10TB worth of data, even with de-duplication offered by the media repo.

The two main supported datastores are currently `file` and `s3`.

Each datastore can have a number of "kinds" associated with it to ensure that specific types of
content gets put in that location. The media repo de-duplicates across all datastores, and the first
encounter for a piece of content will determine which datastore it ends up in. The kinds are specified
through the `forKinds` option in the config, which can have the following values:

* `all` - The datastore can handle all of the following kinds of content.
* `thumbnails` - The datastore will be responsible for handling thumbnails.
* `local_media` - The datastore will house uploads from users on the configured homeservers.
* `remote_media` - The datastore will contain content from other homeservers.
* `archives` - The datastore will handle archives (see the GDPR section for more information).

When multiple datastores are available for a certain kind of media, the media repo will pick the
datastore with the smallest size first to try and balance them out. It is recommended to have a
single datastore be responsible for a single kind of media.

It is valid to have a datastore responsible for no kinds of media for cold storage purposes. See
"datastore management" in this documentation for more information.
