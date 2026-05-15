# IpAddressLookup SDK utility: make_context

from core.context import IpAddressLookupContext


def make_context_util(ctxmap, basectx):
    return IpAddressLookupContext(ctxmap, basectx)
