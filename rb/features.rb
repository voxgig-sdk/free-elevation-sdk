# FreeElevation SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreeElevationFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreeElevationBaseFeature.new
    when "test"
      FreeElevationTestFeature.new
    else
      FreeElevationBaseFeature.new
    end
  end
end
