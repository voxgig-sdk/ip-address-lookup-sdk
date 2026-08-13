# IpAddressLookup SDK feature factory

from ipaddresslookup_sdk.feature.base_feature import IpAddressLookupBaseFeature
from ipaddresslookup_sdk.feature.test_feature import IpAddressLookupTestFeature


def _make_feature(name):
    features = {
        "base": lambda: IpAddressLookupBaseFeature(),
        "test": lambda: IpAddressLookupTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
