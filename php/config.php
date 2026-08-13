<?php
declare(strict_types=1);

// IpAddressLookup SDK configuration

class IpAddressLookupConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "IpAddressLookup",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://ipty.org",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_ip_address" => [],
                ],
            ],
            "entity" => [
        'get_ip_address' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'asn',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'isp',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'organization',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'get_ip_address',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'parts' => [],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.network`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return IpAddressLookupFeatures::make_feature($name);
    }
}
