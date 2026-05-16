<?php
declare(strict_types=1);

// TempMailApi2 SDK utility: result_body

class TempMailApi2ResultBody
{
    public static function call(TempMailApi2Context $ctx): ?TempMailApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
