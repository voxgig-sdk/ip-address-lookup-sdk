package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewGetIpAddressEntityFunc func(client *IpAddressLookupSDK, entopts map[string]any) IpAddressLookupEntity

