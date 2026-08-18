
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


  main = {
    name: 'IpAddressLookup',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$STRING`"
        },
        {
          "name": "isp",
          "type": "`$STRING`"
        },
        {
          "name": "organization",
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

