<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: prepare_body

class ProfanityCheckerPrepareBody
{
    public static function call(ProfanityCheckerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
