# IpAddressLookup SDK utility: feature_add
module IpAddressLookupUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
