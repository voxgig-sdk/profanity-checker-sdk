# ProfanityChecker SDK exists test

require "minitest/autorun"
require_relative "../ProfanityChecker_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ProfanityCheckerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
