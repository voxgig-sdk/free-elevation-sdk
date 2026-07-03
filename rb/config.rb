# FreeElevation SDK configuration

module FreeElevationConfig
  def self.make_config
    {
      "main" => {
        "name" => "FreeElevation",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://www.elevation-api.eu/v1",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "elevation" => {},
        },
      },
      "entity" => {
        "elevation" => {
          "fields" => [
            {
              "active" => true,
              "name" => "elevation",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "latitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "longitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 2,
            },
          ],
          "name" => "elevation",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "example" => "[[46.24566,6.17081],[46.85499,6.78134]]",
                        "kind" => "query",
                        "name" => "pts",
                        "orig" => "pts",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/elevation",
                  "parts" => [
                    "elevation",
                  ],
                  "select" => {
                    "exist" => [
                      "pts",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "example" => 46.24566,
                        "kind" => "param",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "active" => true,
                        "example" => 6.17081,
                        "kind" => "param",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "json",
                        "orig" => "json",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/elevation/{lat}/{lon}",
                  "parts" => [
                    "elevation",
                    "{lat}",
                    "{lon}",
                  ],
                  "select" => {
                    "exist" => [
                      "json",
                      "lat",
                      "lon",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.elevation`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "elevation",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FreeElevationFeatures.make_feature(name)
  end
end
