<?php
declare(strict_types=1);

// FreeElevation SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreeElevationFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreeElevationBaseFeature();
            case "test":
                return new FreeElevationTestFeature();
            default:
                return new FreeElevationBaseFeature();
        }
    }
}
