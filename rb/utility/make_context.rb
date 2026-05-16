# TempMailApi2 SDK utility: make_context
require_relative '../core/context'
module TempMailApi2Utilities
  MakeContext = ->(ctxmap, basectx) {
    TempMailApi2Context.new(ctxmap, basectx)
  }
end
