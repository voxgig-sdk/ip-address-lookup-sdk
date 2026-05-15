# ProjectName SDK exists test

import pytest
from ipaddresslookup_sdk import IpAddressLookupSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = IpAddressLookupSDK.test(None, None)
        assert testsdk is not None
