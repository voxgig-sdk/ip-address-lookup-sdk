# IpAddressLookup SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "IpAddressLookup",
            "slug": "ip-address-lookup",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "asn",
            "short": "Autonomous System Number",
            "type": "`$STRING`",
          },
          {
            "name": "isp",
            "short": "Internet Service Provider",
            "type": "`$STRING`",
          },
          {
            "name": "organization",
            "short": "Organization owning the IP range",
            "type": "`$STRING`",
          },
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
                  "res": "`body.network`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
