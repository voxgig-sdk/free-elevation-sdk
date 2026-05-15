<?php
declare(strict_types=1);

// FreeElevation SDK utility: prepare_body

class FreeElevationPrepareBody
{
    public static function call(FreeElevationContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
