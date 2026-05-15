# FreeElevation SDK utility: make_context
require_relative '../core/context'
module FreeElevationUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreeElevationContext.new(ctxmap, basectx)
  }
end
