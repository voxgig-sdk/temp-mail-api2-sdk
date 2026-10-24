# TempMailApi2 SDK utility: prepare_body
require_relative 'media'
module TempMailApi2Utilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return TempMailApi2Utilities.raw_body(ctx.reqdata) if TempMailApi2Utilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
