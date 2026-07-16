<?php
declare(strict_types=1);

// IpAddressLookup SDK base feature

class IpAddressLookupBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(IpAddressLookupContext $ctx, array $options): void {}
    public function PostConstruct(IpAddressLookupContext $ctx): void {}
    public function PostConstructEntity(IpAddressLookupContext $ctx): void {}
    public function SetData(IpAddressLookupContext $ctx): void {}
    public function GetData(IpAddressLookupContext $ctx): void {}
    public function GetMatch(IpAddressLookupContext $ctx): void {}
    public function SetMatch(IpAddressLookupContext $ctx): void {}
    public function PrePoint(IpAddressLookupContext $ctx): void {}
    public function PreSpec(IpAddressLookupContext $ctx): void {}
    public function PreRequest(IpAddressLookupContext $ctx): void {}
    public function PreResponse(IpAddressLookupContext $ctx): void {}
    public function PreResult(IpAddressLookupContext $ctx): void {}
    public function PreDone(IpAddressLookupContext $ctx): void {}
    public function PreUnexpected(IpAddressLookupContext $ctx): void {}
}
