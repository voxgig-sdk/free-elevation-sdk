<?php
declare(strict_types=1);

// FreeElevation SDK utility: feature_add

class FreeElevationFeatureAdd
{
    public static function call(FreeElevationContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
