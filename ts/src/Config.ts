
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreeElevation',
        slug: "free-elevation",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://www.elevation-api.eu/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      elevation: {
      },

    }
  }


  entity = {
    "elevation": {
      "fields": [
        {
          "name": "elevation",
          "short": "Elevation in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "latitude",
          "short": "Latitude of the point",
          "type": "`$NUMBER`"
        },
        {
          "name": "longitude",
          "short": "Longitude of the point",
          "type": "`$NUMBER`"
        }
      ],
      "name": "elevation",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": "[[46.24566,6.17081],[46.85499,6.78134]]",
                    "kind": "query",
                    "name": "pts",
                    "orig": "pts",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/elevation",
              "parts": [
                "elevation"
              ],
              "select": {
                "exist": [
                  "pts"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "params": [
                  {
                    "example": 46.24566,
                    "kind": "param",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 6.17081,
                    "kind": "param",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  }
                ],
                "query": [
                  {
                    "kind": "query",
                    "name": "json",
                    "orig": "json",
                    "type": "`$BOOLEAN`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/elevation/{lat}/{lon}",
              "parts": [
                "elevation",
                "{lat}",
                "{lon}"
              ],
              "select": {
                "exist": [
                  "json",
                  "lat",
                  "lon"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "elevation"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

