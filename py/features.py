# FreeElevation SDK feature factory

from feature.base_feature import FreeElevationBaseFeature
from feature.test_feature import FreeElevationTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreeElevationBaseFeature(),
        "test": lambda: FreeElevationTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
