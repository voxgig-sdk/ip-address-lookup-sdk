<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: feature_hook

class IpAddressLookupFeatureHook
{
    public static function call(IpAddressLookupContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
