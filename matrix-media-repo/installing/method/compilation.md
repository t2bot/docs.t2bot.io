# Compilation

Go 1.20 is required to compile the media repo.

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

## Windows users

`./build.sh` won't work out of the box for you, likely complaining about `pkg-config` not being found.
To fix this, follow the pkg-config setup instructions [here](https://gtk-rs.org/gtk4-rs/stable/latest/book/installation_windows.html#pkg-config)
and run the following:

```bash
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
.\vcpkg integrate install
.\vcpkg install libheif:x64-windows
```

You may need to update your `PKG_CONFIG_PATH` to include `.\installed\x64-windows\lib\pkgconfig`
and `.\installed\x86-windows\lib\pkgconfig` from the `vcpkg` checkout.

You may also need to update your `PATH` to include `.\installed\x64-windows\bin` and
`.\installed\x86-windows\bin`, again from the `vcpkg` checkout.

After that's all set up, reopen your terminal and run the build steps again.

## Linux users

You will need `libheif-dev` installed.
