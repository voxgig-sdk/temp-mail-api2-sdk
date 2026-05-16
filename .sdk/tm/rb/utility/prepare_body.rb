# TempMailApi2 SDK utility: prepare_body
module TempMailApi2Utilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
