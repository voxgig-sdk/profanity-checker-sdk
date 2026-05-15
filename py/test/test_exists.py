# ProjectName SDK exists test

import pytest
from profanitychecker_sdk import ProfanityCheckerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ProfanityCheckerSDK.test(None, None)
        assert testsdk is not None
