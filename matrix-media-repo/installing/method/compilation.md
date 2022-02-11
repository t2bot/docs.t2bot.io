# Compilation

Go 1.16 is required to compile the media repo.

**Note**: The `master` branch of the media repo is potentially unstable! Be sure to check out a
tagged release for safety.

The following can be run to compile your own binaries for matrix-media-repo:

```bash
mkdir matrix-media-repo
git clone https://github.com/turt2live/matrix-media-repo.git .
./build.sh
```

Once built, there should be binaries in `./bin` ready for deployment.

To use the binaries, follow the instructions for running the downloaded binaries.
