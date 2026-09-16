# ProfanityChecker SDK feature factory

from profanitychecker_sdk.feature.base_feature import ProfanityCheckerBaseFeature
from profanitychecker_sdk.feature.ratelimit_feature import ProfanityCheckerRatelimitFeature
from profanitychecker_sdk.feature.retry_feature import ProfanityCheckerRetryFeature
from profanitychecker_sdk.feature.test_feature import ProfanityCheckerTestFeature
from profanitychecker_sdk.feature.timeout_feature import ProfanityCheckerTimeoutFeature


_FEATURES = {
    "base": lambda: ProfanityCheckerBaseFeature(),
    "ratelimit": lambda: ProfanityCheckerRatelimitFeature(),
    "retry": lambda: ProfanityCheckerRetryFeature(),
    "test": lambda: ProfanityCheckerTestFeature(),
    "timeout": lambda: ProfanityCheckerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
