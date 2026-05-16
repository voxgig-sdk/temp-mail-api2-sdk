<?php
declare(strict_types=1);

// TempMailApi2 SDK exists test

require_once __DIR__ . '/../tempmailapi2_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = TempMailApi2SDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
