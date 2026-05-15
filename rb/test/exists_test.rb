# FreeElevation SDK exists test

require "minitest/autorun"
require_relative "../FreeElevation_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreeElevationSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
