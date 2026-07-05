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
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] network
#   @return [Hash, nil]
GetIpAddress = Struct.new(
  :ip,
  :network,
  keyword_init: true
)

# Request payload for GetIpAddress#load.
#
# @!attribute [rw] ip
#   @return [String, nil]
#
# @!attribute [rw] network
#   @return [Hash, nil]
GetIpAddressLoadMatch = Struct.new(
  :ip,
  :network,
  keyword_init: true
)

