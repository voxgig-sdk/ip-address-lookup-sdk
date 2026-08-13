# IpAddressLookup SDK configuration


def make_config():
    return {
        "main": {
            "name": "IpAddressLookup",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://ipty.org",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_ip_address": {},
            },
        },
        "entity": {
      "get_ip_address": {
        "fields": [
          {
            "active": True,
            "name": "asn",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "isp",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "organization",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "get_ip_address",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.network`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
