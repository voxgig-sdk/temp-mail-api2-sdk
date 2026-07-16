<?php
declare(strict_types=1);

// TempMailApi2 SDK base feature

class TempMailApi2BaseFeature
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

    public function init(TempMailApi2Context $ctx, array $options): void {}
    public function PostConstruct(TempMailApi2Context $ctx): void {}
    public function PostConstructEntity(TempMailApi2Context $ctx): void {}
    public function SetData(TempMailApi2Context $ctx): void {}
    public function GetData(TempMailApi2Context $ctx): void {}
    public function GetMatch(TempMailApi2Context $ctx): void {}
    public function SetMatch(TempMailApi2Context $ctx): void {}
    public function PrePoint(TempMailApi2Context $ctx): void {}
    public function PreSpec(TempMailApi2Context $ctx): void {}
    public function PreRequest(TempMailApi2Context $ctx): void {}
    public function PreResponse(TempMailApi2Context $ctx): void {}
    public function PreResult(TempMailApi2Context $ctx): void {}
    public function PreDone(TempMailApi2Context $ctx): void {}
    public function PreUnexpected(TempMailApi2Context $ctx): void {}
}
