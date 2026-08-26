
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
    name: 'IpAddressLookup',
        slug: "ip-address-lookup",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://ipty.org",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_ip_address: {
      },

    }
  }


  entity = {
    "get_ip_address": {
      "fields": [
        {
          "name": "asn",
          "short": "Autonomous System Number",
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "short": "Internet Service Provider",
          "type": "`$STRING`"
        },
        {
          "name": "organization",
          "short": "Organization owning the IP range",
          "type": "`$STRING`"
        }
      ],
      "name": "get_ip_address",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.network`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

