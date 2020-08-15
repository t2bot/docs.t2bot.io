# URL previews

Clients looking to assist users by showing the contents of a URL will often rely on the server
to generate a preview to avoid exposing the user's IP to the service. The media repo can have
URL previews disabled (usually resulting in previews not being shown to users), though it is
recommended to have them enabled for the best user experience.

The media repo uses OpenGraph and its own built-in page scraping to generate previews, though
other methods can be enabled (see later documentation).

The configuration for URL previews is as follows:

```yaml
urlPreviews:
  enabled: true
  numWorkers: 10
  maxPageSizeBytes: 10485760 # 10MB default, 0 to disable
  filePreviewTypes:
    - "image/*"
  defaultLanguage: "en-US,en"
  numWords: 50
  maxLength: 200
  numTitleWords: 30
  maxTitleLength: 150
  expireAfterDays: 0
```

Like downloads and thumbnails, URL previews have a worker system to process multiple concurrent
requests for previews. The number of active workers can be controlled with `numWorkers`. By default
this is 10, though larger deployments may wish to consider setting this to a number in the hundreds
to ensure there is enough availability to process previews quickly.

Also like thumbnails, URL previews can have a significant drain on resources. To help minimize the
impact, change `maxPageSizeBytes` to limit how much of a page the media repo will try and preview.

The `filePreviewTypes` are the mimetypes the media repo will try to thumbnail if it encounters them
during the preview generation process. This is usually thumbnailed and shown alongside the other
information in the preview.

`defaultLanguage` can be used as teh default language to send to the remote server when the client
doesn't send an `Accept-Language` header to the media repo.

Previews are limited by a number of words first, then limited to a number of characters (which may
involve taking a few words off the end). This is to try and give a sensible preview of what the
page describes without generating previews with a large amount of text. The title for the preview
can be controlled with `numTitleWords` and `maxTitleLength` whereas the description (body) can be
controlled with `numWords` and `maxLength`.

URL previews are often not used after a couple days and can be safely purged with `expireAfterDays`.
If a client re-requests a preview, it will be regenerated.
