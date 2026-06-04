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
              "name" => "elevation",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "latitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "longitude",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "elevation",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "[[46.24566,6.17081],[46.85499,6.78134]]",
                        "kind" => "query",
                        "name" => "pts",
                        "orig" => "pts",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
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
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 46.24566,
                        "kind" => "param",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                      {
                        "example" => 6.17081,
                        "kind" => "param",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                        "active" => true,
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "json",
                        "orig" => "json",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                        "active" => true,
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
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
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
