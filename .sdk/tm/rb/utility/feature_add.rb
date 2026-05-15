# ProfanityChecker SDK utility: feature_add
module ProfanityCheckerUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
