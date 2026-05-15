<?php
declare(strict_types=1);

// FreeElevation SDK exists test

require_once __DIR__ . '/../freeelevation_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreeElevationSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
