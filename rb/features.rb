# IpAddressLookup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module IpAddressLookupFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpAddressLookupBaseFeature.new
    when "ratelimit"
      IpAddressLookupRatelimitFeature.new
    when "retry"
      IpAddressLookupRetryFeature.new
    when "test"
      IpAddressLookupTestFeature.new
    when "timeout"
      IpAddressLookupTimeoutFeature.new
    else
      IpAddressLookupBaseFeature.new
    end
  end
end
