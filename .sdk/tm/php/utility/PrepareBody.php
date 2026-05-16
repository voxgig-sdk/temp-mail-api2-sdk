<?php
declare(strict_types=1);

// TempMailApi2 SDK utility: prepare_body

class TempMailApi2PrepareBody
{
    public static function call(TempMailApi2Context $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
