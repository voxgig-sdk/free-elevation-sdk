<?php
declare(strict_types=1);

// FreeElevation SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreeElevationMakeContext
{
    public static function call(array $ctxmap, ?FreeElevationContext $basectx): FreeElevationContext
    {
        return new FreeElevationContext($ctxmap, $basectx);
    }
}
