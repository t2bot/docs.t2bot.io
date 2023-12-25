---
layout: docs_page
docsFor: matrix-media-repo/unstable
titlePrefix: matrix-media-repo
---

# Developer Documentation

**⚠️ If you are not a developer, or not compiling MMR yourself, you can ignore this page.**

**⚠️ The instructions on this page are subject to change without notice. Please check back for each
release.**

**⚠️ No support is available for self-compiled MMR binaries.**

## Compilation

Requirements:

* Go 1.20
* `libde265-dev` and `libheif-dev` (Windows users: see below for how to install these)

**Note**: The main branch (default when cloning a git repo) is *unstable*. Be sure to check out a tag
if you're building production binaries. For developers aiming to contribute, use the main branch.

A `./build.sh` script is provided in the repository - run this to build your binaries. They will end
up in `./bin`, unless there were errors during compilation.

### Windows Users

`./build.sh` won't work automatically, and will error complaining about `pkg-config` or similar. To
fix this, [install pkg-config](https://gtk-rs.org/gtk4-rs/stable/latest/book/installation_windows.html#pkg-config)
and then run the following:

```bash
git clone https://github.com/Microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
.\vcpkg integrate install
.\vcpkg install libde265:x64-windows libde265:x86-windows
.\vcpkg install libheif:x64-windows libheif:x86-windows
```

You may need to update your `PKG_CONFIG_PATH` to include `.\installed\x64-windows\lib\pkgconfig` and
`.\installed\x86-windows\lib\pkgconfig` from the `vcpkg` checkout.

You may also need to update your `PATH` to include `.\installed\x64-windows\bin` and `.\installed\x86-windows\bin`,
again from the `vcpkg` checkout.

Afterwards, simply restart your terminal and re-run `./build.sh`.
