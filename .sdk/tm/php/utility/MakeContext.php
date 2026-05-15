<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class IpAddressLookupMakeContext
{
    public static function call(array $ctxmap, ?IpAddressLookupContext $basectx): IpAddressLookupContext
    {
        return new IpAddressLookupContext($ctxmap, $basectx);
    }
}
