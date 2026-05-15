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
                "auth" => [
                    "prefix" => "Bearer",
                ],
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
              'name' => 'ip',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'network',
              'req' => false,
              'type' => '`$OBJECT`',
              'active' => true,
              'index$' => 1,
            ],
          ],
          'name' => 'get_ip_address',
          'op' => [
            'load' => [
              'name' => 'load',
              'points' => [
                [
                  'method' => 'GET',
                  'orig' => '/',
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'active' => true,
                  'parts' => [],
                  'args' => [],
                  'select' => [],
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
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
