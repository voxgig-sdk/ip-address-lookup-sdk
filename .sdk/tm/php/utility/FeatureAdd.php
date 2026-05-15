<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: feature_add

class IpAddressLookupFeatureAdd
{
    public static function call(IpAddressLookupContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
