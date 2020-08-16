# Thumbnails

Thumbnails are requested by most clients to ensure that things like images can be shown at a smaller
size than the full media. Thumbnails have a large memory and CPU requirement and are the most
requested resource of the media repo.

The full configuration for thumbnails is:

```yaml
thumbnails:
  maxSourceBytes: 10485760 # 10MB default, 0 to disable
  numWorkers: 100
  expireAfterDays: 0
  sizes:
    - width: 32
      height: 32
    - width: 96
      height: 96
    - width: 320
      height: 240
    - width: 640
      height: 480
    - width: 800
      height: 600
  dynamicSizing: false
  allowAnimated: true
  defaultAnimated: false
  maxAnimateSizeBytes: 10485760 # 10MB default, 0 to disable
  stillFrame: 0.5
  types:
    - "image/jpeg"
    - "image/jpg"
    - "image/png"
    - "image/gif"
    - "image/heif"
    - "image/webp"
    #- "image/svg+xml" # Be sure to have ImageMagick installed to thumbnail SVG files
```

Many of these options are described in later sections.

`maxSourceBytes` controls how big of media is allowed to be thumbnailed. Typically the memory
usage for a thumbnail will be at worse 1.5x this value, multipled by `numWorkers` (the number of
thumbnails to generate concurrently). To avoid exhausting the server of memory, it is recommended to
keep this at roughly 1/10th the maximum upload size, though specific use cases may call for less or
more.

`numWorkers`, as mentioned, is the number of concurrent thumbnails to process. The media repo will
queue up thumbnails which need to be generated, though with thumbnails being the most highly requested
resource it is important to ensure there is enough room to process those thumbnails. Once a thumbnail
is generated, it is stored in the media repo so it does not need to be re-generated again.

Approximately 2 weeks after a thumbnail has been generated, clients are unlikely to request a
thumbnail again. To save space, `expireAfterDays` can be set to clean up thumbnails which have been
previously generated. If a client re-requests a thumbnail, it will be regenerated.

## Thumbnail sizes & dynamic sizing

The `sizes` control which buckets to fit thumbnails into. The Matrix specification allows the media
repo to return a *larger* thumbnail than the client requested, or a maximum size if no larger size
is available. As such, the media repo will return a thumbnail exactly matching one of these sizes
depending on the request from the client. The most common size requests are shown above.

For more pixel-perfect thumbnails that aren't potentially blurry in clients, set `dynamicSizing: true`
to ignore the `sizes` list and instead generate a thumbnail for the exact size the client requested.
This will lead to significantly more thumbnails being generated, which means higher storage
requirements and higher resource requirements (typically).

## Animated thumbnails

Thumbnails by default are static images which are resized and cropped to the appropriate dimensions.
Some image formats, like GIFs, can sometimes be better as animated thumbnails instead of a static
image.

For non-animated thumbnails on animated file types (like GIFs), the `stillFrame` option chooses where
in the file's duration to generate a thumbnail from. By default this is `0.5` to use an image from the
middle in order to handle GIFs which would appear as a transparent frame if picked from the start.

Animated thumbnails can be entirely turned off using `allowAnimated`, forcing the media repo to use
the `stillFrame` option for all animated media types.

Animated thumbnails can be requested by clients, though many do not support this custom flag on the
media repo. To change the behaviour to turn on animations by default, set `defaultAnimated: true`.

Animated thumbnails can be much more resource intensive to handle than regular thumbnails, and as
such the source material can be limited with `maxAnimateSizeBytes`. This option only applies when
the media repo is generating an animated thumbnail. It is recommended to keep this value fairly
small to avoid letting resource usage exceed expectations.

## Thumbnail types

The `types` controls which mimetypes of media the media repo should try to thumbnail. The media
repo supports the mimetypes listed in the sample config, with more being possible in the future.

**Note**: `image/svg+xml` requires [ImageMagick](https://imagemagick.org/index.php) to be available
to the media repo. The Docker image contains the appropriate binaries for this to happen.
