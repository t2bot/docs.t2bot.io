# Identicons

Identicons are generated avatars for a given hash. Some legacy clients use this endpoint
to supply a default avatar to users, though it is not very common.

There is only one option for identicons - whether or not to use them:

```yaml
identicons:
    enabled: true
```

The resource requirements for having identicons enabled are minimal. An example of an identicon
for "matrix-bot" is:

![matrix-bot-identicon](../img/media-repo-identicon-matrix-bot.png)
