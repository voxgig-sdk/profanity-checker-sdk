# ProfanityChecker SDK utility: make_context
require_relative '../core/context'
module ProfanityCheckerUtilities
  MakeContext = ->(ctxmap, basectx) {
    ProfanityCheckerContext.new(ctxmap, basectx)
  }
end
