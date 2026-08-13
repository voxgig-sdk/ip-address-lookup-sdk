# IpAddressLookup SDK utility: make_context

from ipaddresslookup_sdk.core.context import IpAddressLookupContext


def make_context_util(ctxmap, basectx):
    return IpAddressLookupContext(ctxmap, basectx)
