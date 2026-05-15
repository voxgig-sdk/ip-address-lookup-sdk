# IpAddressLookup SDK utility: make_context
require_relative '../core/context'
module IpAddressLookupUtilities
  MakeContext = ->(ctxmap, basectx) {
    IpAddressLookupContext.new(ctxmap, basectx)
  }
end
