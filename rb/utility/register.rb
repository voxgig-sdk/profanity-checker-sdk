# ProfanityChecker SDK utility registration
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

ProfanityCheckerUtility.registrar = ->(u) {
  u.clean = ProfanityCheckerUtilities::Clean
  u.done = ProfanityCheckerUtilities::Done
  u.make_error = ProfanityCheckerUtilities::MakeError
  u.feature_add = ProfanityCheckerUtilities::FeatureAdd
  u.feature_hook = ProfanityCheckerUtilities::FeatureHook
  u.feature_init = ProfanityCheckerUtilities::FeatureInit
  u.fetcher = ProfanityCheckerUtilities::Fetcher
  u.make_fetch_def = ProfanityCheckerUtilities::MakeFetchDef
  u.make_context = ProfanityCheckerUtilities::MakeContext
  u.make_options = ProfanityCheckerUtilities::MakeOptions
  u.make_request = ProfanityCheckerUtilities::MakeRequest
  u.make_response = ProfanityCheckerUtilities::MakeResponse
  u.make_result = ProfanityCheckerUtilities::MakeResult
  u.make_point = ProfanityCheckerUtilities::MakePoint
  u.make_spec = ProfanityCheckerUtilities::MakeSpec
  u.make_url = ProfanityCheckerUtilities::MakeUrl
  u.param = ProfanityCheckerUtilities::Param
  u.prepare_auth = ProfanityCheckerUtilities::PrepareAuth
  u.prepare_body = ProfanityCheckerUtilities::PrepareBody
  u.prepare_headers = ProfanityCheckerUtilities::PrepareHeaders
  u.prepare_method = ProfanityCheckerUtilities::PrepareMethod
  u.prepare_params = ProfanityCheckerUtilities::PrepareParams
  u.prepare_path = ProfanityCheckerUtilities::PreparePath
  u.prepare_query = ProfanityCheckerUtilities::PrepareQuery
  u.result_basic = ProfanityCheckerUtilities::ResultBasic
  u.result_body = ProfanityCheckerUtilities::ResultBody
  u.result_headers = ProfanityCheckerUtilities::ResultHeaders
  u.transform_request = ProfanityCheckerUtilities::TransformRequest
  u.transform_response = ProfanityCheckerUtilities::TransformResponse
}
