# oEmbed

oEmbed is another form of previewing a URL which requires talking to a provider. By default the
media repo has oEmbed previews disabled for privacy concerns, however this can be changed with
the following configuration:

```yaml
urlPreviews:
  oEmbed: true
```

The media repo ships with [oEmbed's official providers](https://oembed.com/providers.json) list
bundled in and will use that if an alternative `providers.json` is not specified. The
`providers.json` is considered an "asset" for the media repo, and can be changed by specifying an
asset path as a command line flag.
