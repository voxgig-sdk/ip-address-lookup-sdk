<?php
declare(strict_types=1);

// IpAddressLookup SDK utility: result_headers

class IpAddressLookupResultHeaders
{
    public static function call(IpAddressLookupContext $ctx): ?IpAddressLookupResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
