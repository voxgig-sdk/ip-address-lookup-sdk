# frozen_string_literal: true

# Typed models for the IpAddressLookup SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# GetIpAddress entity data model.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] organization
#   @return [String, nil]
GetIpAddress = Struct.new(
  :asn,
  :isp,
  :organization,
  keyword_init: true
)

# Request payload for GetIpAddress#load.
#
# @!attribute [rw] asn
#   @return [String, nil]
#
# @!attribute [rw] isp
#   @return [String, nil]
#
# @!attribute [rw] organization
#   @return [String, nil]
GetIpAddressLoadMatch = Struct.new(
  :asn,
  :isp,
  :organization,
  keyword_init: true
)

