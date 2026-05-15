<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: clean

class ProfanityCheckerClean
{
    public static function call(ProfanityCheckerContext $ctx, mixed $val): mixed
    {
        return $val;
    }
}
