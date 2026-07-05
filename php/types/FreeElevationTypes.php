<?php
declare(strict_types=1);

// Typed models for the FreeElevation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Elevation entity data model. */
class Elevation
{
    public ?float $elevation = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
}

/** Request payload for Elevation#load. */
class ElevationLoadMatch
{
    public float $lat;
    public float $lon;
}

/** Request payload for Elevation#list. */
class ElevationListMatch
{
    public ?float $elevation = null;
    public ?float $latitude = null;
    public ?float $longitude = null;
}

