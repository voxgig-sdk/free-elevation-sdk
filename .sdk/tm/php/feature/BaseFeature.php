<?php
declare(strict_types=1);

// FreeElevation SDK base feature

class FreeElevationBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(FreeElevationContext $ctx, array $options): void {}
    public function PostConstruct(FreeElevationContext $ctx): void {}
    public function PostConstructEntity(FreeElevationContext $ctx): void {}
    public function SetData(FreeElevationContext $ctx): void {}
    public function GetData(FreeElevationContext $ctx): void {}
    public function GetMatch(FreeElevationContext $ctx): void {}
    public function SetMatch(FreeElevationContext $ctx): void {}
    public function PrePoint(FreeElevationContext $ctx): void {}
    public function PreSpec(FreeElevationContext $ctx): void {}
    public function PreRequest(FreeElevationContext $ctx): void {}
    public function PreResponse(FreeElevationContext $ctx): void {}
    public function PreResult(FreeElevationContext $ctx): void {}
    public function PreDone(FreeElevationContext $ctx): void {}
    public function PreUnexpected(FreeElevationContext $ctx): void {}
}
