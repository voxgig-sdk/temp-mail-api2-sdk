# TempMailApi2 SDK feature factory

from tempmailapi2_sdk.feature.base_feature import TempMailApi2BaseFeature
from tempmailapi2_sdk.feature.ratelimit_feature import TempMailApi2RatelimitFeature
from tempmailapi2_sdk.feature.retry_feature import TempMailApi2RetryFeature
from tempmailapi2_sdk.feature.test_feature import TempMailApi2TestFeature
from tempmailapi2_sdk.feature.timeout_feature import TempMailApi2TimeoutFeature


_FEATURES = {
    "base": lambda: TempMailApi2BaseFeature(),
    "ratelimit": lambda: TempMailApi2RatelimitFeature(),
    "retry": lambda: TempMailApi2RetryFeature(),
    "test": lambda: TempMailApi2TestFeature(),
    "timeout": lambda: TempMailApi2TimeoutFeature(),
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
