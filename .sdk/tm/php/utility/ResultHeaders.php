<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: result_headers

class ProfanityCheckerResultHeaders
{
    public static function call(ProfanityCheckerContext $ctx): ?ProfanityCheckerResult
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
