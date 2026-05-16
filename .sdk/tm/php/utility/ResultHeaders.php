<?php
declare(strict_types=1);

// TempMailApi2 SDK utility: result_headers

class TempMailApi2ResultHeaders
{
    public static function call(TempMailApi2Context $ctx): ?TempMailApi2Result
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
