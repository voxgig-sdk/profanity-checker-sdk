# ProfanityChecker SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ProfanityCheckerFeatures
  def self.make_feature(name)
    case name
    when "base"
      ProfanityCheckerBaseFeature.new
    when "test"
      ProfanityCheckerTestFeature.new
    else
      ProfanityCheckerBaseFeature.new
    end
  end
end
