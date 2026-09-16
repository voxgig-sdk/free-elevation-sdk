# FreeElevation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreeElevationFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeElevationBaseFeature.new
    when "ratelimit"
      FreeElevationRatelimitFeature.new
    when "retry"
      FreeElevationRetryFeature.new
    when "test"
      FreeElevationTestFeature.new
    when "timeout"
      FreeElevationTimeoutFeature.new
    else
      FreeElevationBaseFeature.new
    end
  end
end
