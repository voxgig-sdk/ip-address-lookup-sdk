<?php
declare(strict_types=1);

// IpAddressLookup SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class IpAddressLookupFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new IpAddressLookupBaseFeature();
            case "test":
                return new IpAddressLookupTestFeature();
            default:
                return new IpAddressLookupBaseFeature();
        }
    }
}
