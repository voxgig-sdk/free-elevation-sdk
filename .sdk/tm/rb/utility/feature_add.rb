# FreeElevation SDK utility: feature_add
module FreeElevationUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
