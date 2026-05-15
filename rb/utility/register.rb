# IpAddressLookup SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

IpAddressLookupUtility.registrar = ->(u) {
  u.clean = IpAddressLookupUtilities::Clean
  u.done = IpAddressLookupUtilities::Done
  u.make_error = IpAddressLookupUtilities::MakeError
  u.feature_add = IpAddressLookupUtilities::FeatureAdd
  u.feature_hook = IpAddressLookupUtilities::FeatureHook
  u.feature_init = IpAddressLookupUtilities::FeatureInit
  u.fetcher = IpAddressLookupUtilities::Fetcher
  u.make_fetch_def = IpAddressLookupUtilities::MakeFetchDef
  u.make_context = IpAddressLookupUtilities::MakeContext
  u.make_options = IpAddressLookupUtilities::MakeOptions
  u.make_request = IpAddressLookupUtilities::MakeRequest
  u.make_response = IpAddressLookupUtilities::MakeResponse
  u.make_result = IpAddressLookupUtilities::MakeResult
  u.make_point = IpAddressLookupUtilities::MakePoint
  u.make_spec = IpAddressLookupUtilities::MakeSpec
  u.make_url = IpAddressLookupUtilities::MakeUrl
  u.param = IpAddressLookupUtilities::Param
  u.prepare_auth = IpAddressLookupUtilities::PrepareAuth
  u.prepare_body = IpAddressLookupUtilities::PrepareBody
  u.prepare_headers = IpAddressLookupUtilities::PrepareHeaders
  u.prepare_method = IpAddressLookupUtilities::PrepareMethod
  u.prepare_params = IpAddressLookupUtilities::PrepareParams
  u.prepare_path = IpAddressLookupUtilities::PreparePath
  u.prepare_query = IpAddressLookupUtilities::PrepareQuery
  u.result_basic = IpAddressLookupUtilities::ResultBasic
  u.result_body = IpAddressLookupUtilities::ResultBody
  u.result_headers = IpAddressLookupUtilities::ResultHeaders
  u.transform_request = IpAddressLookupUtilities::TransformRequest
  u.transform_response = IpAddressLookupUtilities::TransformResponse
}
