<?php
declare(strict_types=1);

// FreeElevation SDK utility: result_body

class FreeElevationResultBody
{
    public static function call(FreeElevationContext $ctx): ?FreeElevationResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
