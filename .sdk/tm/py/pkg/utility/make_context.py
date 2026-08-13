# TempMailApi2 SDK utility: make_context

from projectname_sdk.core.context import TempMailApi2Context


def make_context_util(ctxmap, basectx):
    return TempMailApi2Context(ctxmap, basectx)
