<?php
declare(strict_types=1);

// TempMailApi2 SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class TempMailApi2Features
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new TempMailApi2BaseFeature();
            case "test":
                return new TempMailApi2TestFeature();
            default:
                return new TempMailApi2BaseFeature();
        }
    }
}
