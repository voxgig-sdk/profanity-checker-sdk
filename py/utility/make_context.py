# ProfanityChecker SDK utility: make_context

from core.context import ProfanityCheckerContext


def make_context_util(ctxmap, basectx):
    return ProfanityCheckerContext(ctxmap, basectx)
