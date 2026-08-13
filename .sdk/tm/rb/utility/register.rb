# TempMailApi2 SDK utility registration
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
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TempMailApi2Utility.registrar = ->(u) {
  u.clean = TempMailApi2Utilities::Clean
  u.done = TempMailApi2Utilities::Done
  u.make_error = TempMailApi2Utilities::MakeError
  u.feature_add = TempMailApi2Utilities::FeatureAdd
  u.feature_hook = TempMailApi2Utilities::FeatureHook
  u.feature_init = TempMailApi2Utilities::FeatureInit
  u.fetcher = TempMailApi2Utilities::Fetcher
  u.make_fetch_def = TempMailApi2Utilities::MakeFetchDef
  u.make_context = TempMailApi2Utilities::MakeContext
  u.make_options = TempMailApi2Utilities::MakeOptions
  u.make_request = TempMailApi2Utilities::MakeRequest
  u.make_response = TempMailApi2Utilities::MakeResponse
  u.make_result = TempMailApi2Utilities::MakeResult
  u.make_point = TempMailApi2Utilities::MakePoint
  u.make_spec = TempMailApi2Utilities::MakeSpec
  u.make_url = TempMailApi2Utilities::MakeUrl
  u.param = TempMailApi2Utilities::Param
  u.prepare_auth = TempMailApi2Utilities::PrepareAuth
  u.prepare_body = TempMailApi2Utilities::PrepareBody
  u.prepare_headers = TempMailApi2Utilities::PrepareHeaders
  u.prepare_method = TempMailApi2Utilities::PrepareMethod
  u.prepare_params = TempMailApi2Utilities::PrepareParams
  u.prepare_path = TempMailApi2Utilities::PreparePath
  u.prepare_query = TempMailApi2Utilities::PrepareQuery
  u.graphql_body = TempMailApi2Utilities::GraphqlBody
  u.graphql_errors = TempMailApi2Utilities::GraphqlErrors
  u.result_basic = TempMailApi2Utilities::ResultBasic
  u.result_body = TempMailApi2Utilities::ResultBody
  u.result_headers = TempMailApi2Utilities::ResultHeaders
  u.transform_request = TempMailApi2Utilities::TransformRequest
  u.transform_response = TempMailApi2Utilities::TransformResponse
}
