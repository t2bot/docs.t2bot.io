---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Signing Keys

MMR is capable of [MSC3916](https://github.com/matrix-org/matrix-spec-proposals/pull/3916)-style
authentication, which requires the use of a "signing key" to authorize outbound federated requests
for media. MMR can authorize inbound requests without a signing key.

To set up a signing key for MMR:

1. Back up your existing homeserver signing key, and store it in a safe place. The signing key
   effectively grants full access to your server and events, and should not be disclosed to anyone.
2. Download the `generate_signing_key` and `combine_signing_keys` tools for your version of MMR from
   the [GitHub releases page](https://github.com/t2bot/matrix-media-repo/releases).
3. Run `./generate_signing_key -output mmr.signing.key` to create a signing key usable with MMR.
4. If you're using Synapse as your homeserver software, run `./combine_signing_keys -format synapse -output ./merged.signing.key ./existing.signing.key ./mmr.signing.key`
   to combine the signing keys, being sure to list Synapse's existing signing key *first* in the
   arguments. For all other homeserver software, please consult the homeserver documentation for
   how to deploy multiple signing keys. Note that not all homeserver software options support
   multiple signing keys.
5. Run `cat ./merged.signing.key` to verify that your existing signing key ID is on the first line.
   You can get your key ID from `GET /_matrix/key/v2/server` against your homeserver in a web browser.
   If your existing signing key is *not* first, re-run the steps above, noting the order of keys
   supplied to `./combine_signing_keys` is important.
6. Deploy `./merged.signing.key` to your Synapse server in place of the existing signing key,
   restarting it.
7. Deploy `./mmr.signing.key` alongside MMR and specified as `signingKeyPath` for that homeserver
   in your MMR config.

In the event that you ever need to revoke MMR's signing key from your homeserver, restore your
signing key from the most recent backup. If your homeserver's signing key changes after running the
above steps, re-run the steps above to set up your server with the new key. Note that it's considered
good practice to list your old signing keys, including MMR's revoked keys, under `old_verify_keys`
on `GET /_matrix/key/v2/server` - many homeservers offer a config option to populate this field.
