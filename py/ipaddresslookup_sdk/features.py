# IpAddressLookup SDK feature factory

from ipaddresslookup_sdk.feature.base_feature import IpAddressLookupBaseFeature
from ipaddresslookup_sdk.feature.ratelimit_feature import IpAddressLookupRatelimitFeature
from ipaddresslookup_sdk.feature.retry_feature import IpAddressLookupRetryFeature
from ipaddresslookup_sdk.feature.test_feature import IpAddressLookupTestFeature
from ipaddresslookup_sdk.feature.timeout_feature import IpAddressLookupTimeoutFeature


_FEATURES = {
    "base": lambda: IpAddressLookupBaseFeature(),
    "ratelimit": lambda: IpAddressLookupRatelimitFeature(),
    "retry": lambda: IpAddressLookupRetryFeature(),
    "test": lambda: IpAddressLookupTestFeature(),
    "timeout": lambda: IpAddressLookupTimeoutFeature(),
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
