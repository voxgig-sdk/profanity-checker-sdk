<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: feature_add

class ProfanityCheckerFeatureAdd
{
    public static function call(ProfanityCheckerContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
