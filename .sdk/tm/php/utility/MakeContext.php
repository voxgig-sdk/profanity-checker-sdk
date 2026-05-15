<?php
declare(strict_types=1);

// ProfanityChecker SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ProfanityCheckerMakeContext
{
    public static function call(array $ctxmap, ?ProfanityCheckerContext $basectx): ProfanityCheckerContext
    {
        return new ProfanityCheckerContext($ctxmap, $basectx);
    }
}
