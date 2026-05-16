# TempMailApi2 SDK feature factory

from feature.base_feature import TempMailApi2BaseFeature
from feature.test_feature import TempMailApi2TestFeature


def _make_feature(name):
    features = {
        "base": lambda: TempMailApi2BaseFeature(),
        "test": lambda: TempMailApi2TestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
