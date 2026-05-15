# ProfanityChecker SDK feature factory

from feature.base_feature import ProfanityCheckerBaseFeature
from feature.test_feature import ProfanityCheckerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ProfanityCheckerBaseFeature(),
        "test": lambda: ProfanityCheckerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
