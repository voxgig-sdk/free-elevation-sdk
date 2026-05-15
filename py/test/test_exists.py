# ProjectName SDK exists test

import pytest
from freeelevation_sdk import FreeElevationSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreeElevationSDK.test(None, None)
        assert testsdk is not None
