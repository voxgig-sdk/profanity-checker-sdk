<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: result_body

class ProfanityCheckerResultBody
{
    public static function call(ProfanityCheckerContext $ctx): ?ProfanityCheckerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
