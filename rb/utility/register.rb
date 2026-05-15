# FreeElevation SDK utility registration
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

FreeElevationUtility.registrar = ->(u) {
  u.clean = FreeElevationUtilities::Clean
  u.done = FreeElevationUtilities::Done
  u.make_error = FreeElevationUtilities::MakeError
  u.feature_add = FreeElevationUtilities::FeatureAdd
  u.feature_hook = FreeElevationUtilities::FeatureHook
  u.feature_init = FreeElevationUtilities::FeatureInit
  u.fetcher = FreeElevationUtilities::Fetcher
  u.make_fetch_def = FreeElevationUtilities::MakeFetchDef
  u.make_context = FreeElevationUtilities::MakeContext
  u.make_options = FreeElevationUtilities::MakeOptions
  u.make_request = FreeElevationUtilities::MakeRequest
  u.make_response = FreeElevationUtilities::MakeResponse
  u.make_result = FreeElevationUtilities::MakeResult
  u.make_point = FreeElevationUtilities::MakePoint
  u.make_spec = FreeElevationUtilities::MakeSpec
  u.make_url = FreeElevationUtilities::MakeUrl
  u.param = FreeElevationUtilities::Param
  u.prepare_auth = FreeElevationUtilities::PrepareAuth
  u.prepare_body = FreeElevationUtilities::PrepareBody
  u.prepare_headers = FreeElevationUtilities::PrepareHeaders
  u.prepare_method = FreeElevationUtilities::PrepareMethod
  u.prepare_params = FreeElevationUtilities::PrepareParams
  u.prepare_path = FreeElevationUtilities::PreparePath
  u.prepare_query = FreeElevationUtilities::PrepareQuery
  u.result_basic = FreeElevationUtilities::ResultBasic
  u.result_body = FreeElevationUtilities::ResultBody
  u.result_headers = FreeElevationUtilities::ResultHeaders
  u.transform_request = FreeElevationUtilities::TransformRequest
  u.transform_response = FreeElevationUtilities::TransformResponse
}
