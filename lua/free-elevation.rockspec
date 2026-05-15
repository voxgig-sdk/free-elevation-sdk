package = "voxgig-sdk-free-elevation"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/free-elevation-sdk.git"
}
description = {
  summary = "FreeElevation SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["free-elevation_sdk"] = "free-elevation_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
