# ProfanityChecker SDK utility: make_context

from profanitychecker_sdk.core.context import ProfanityCheckerContext


def make_context_util(ctxmap, basectx):
    return ProfanityCheckerContext(ctxmap, basectx)
