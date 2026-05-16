# TempMailApi2 SDK utility: make_request

from __future__ import annotations
from core.response import TempMailApi2Response
from core.result import TempMailApi2Result


def make_request_util(ctx):
    if ctx.out.get("request") is not None:
        return ctx.out["request"], None

    spec = ctx.spec
    utility = ctx.utility

    response = TempMailApi2Response({})
    result = TempMailApi2Result({})
    ctx.result = result

    if spec is None:
        return None, ctx.make_error("request_no_spec",
            "Expected context spec property to be defined.")

    fetchdef, err = utility.make_fetch_def(ctx)
    if err is not None:
        response.err = err
        ctx.response = response
        spec.step = "postrequest"
        return response, None

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["fetchdef"] = fetchdef

    spec.step = "prerequest"

    url = fetchdef.get("url", "")
    fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

    if fetch_err is not None:
        response.err = fetch_err
    elif fetched is None:
        response = TempMailApi2Response({
            "err": ctx.make_error("request_no_response", "response: undefined"),
        })
    elif isinstance(fetched, dict):
        response = TempMailApi2Response(fetched)
    else:
        response.err = ctx.make_error("request_invalid_response", "response: invalid type")

    spec.step = "postrequest"
    ctx.response = response

    return response, None
