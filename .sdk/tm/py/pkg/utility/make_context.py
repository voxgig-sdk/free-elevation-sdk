# FreeElevation SDK utility: make_context

from projectname_sdk.core.context import FreeElevationContext


def make_context_util(ctxmap, basectx):
    return FreeElevationContext(ctxmap, basectx)
