# ProjectName SDK exists test

import pytest
from tempmailapi2_sdk import TempMailApi2SDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = TempMailApi2SDK.test(None, None)
        assert testsdk is not None
