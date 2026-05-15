# IpAddressLookup SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module IpAddressLookupFeatures
  def self.make_feature(name)
    case name
    when "base"
      IpAddressLookupBaseFeature.new
    when "test"
      IpAddressLookupTestFeature.new
    else
      IpAddressLookupBaseFeature.new
    end
  end
end
