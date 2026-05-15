<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: result_body

class IpAddressLookupResultBody
{
    public static function call(IpAddressLookupContext $ctx): ?IpAddressLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
