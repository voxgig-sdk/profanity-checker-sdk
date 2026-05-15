<?php
declare(strict_types=1);

// ProfanityChecker SDK exists test

require_once __DIR__ . '/../profanitychecker_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ProfanityCheckerSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
