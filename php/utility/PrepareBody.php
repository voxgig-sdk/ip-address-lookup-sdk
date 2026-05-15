<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: prepare_body

class IpAddressLookupPrepareBody
{
    public static function call(IpAddressLookupContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
