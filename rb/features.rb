# ProfanityChecker SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ProfanityCheckerFeatures
  def self.make_feature(name)
    case name
    when "base"
      ProfanityCheckerBaseFeature.new
    when "ratelimit"
      ProfanityCheckerRatelimitFeature.new
    when "retry"
      ProfanityCheckerRetryFeature.new
    when "test"
      ProfanityCheckerTestFeature.new
    when "timeout"
      ProfanityCheckerTimeoutFeature.new
    else
      ProfanityCheckerBaseFeature.new
    end
  end
end
