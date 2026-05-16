# TempMailApi2 SDK utility: feature_add
module TempMailApi2Utilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
