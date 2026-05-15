<?php
declare(strict_types=1);

// ProfanityChecker SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ProfanityCheckerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ProfanityCheckerBaseFeature();
            case "test":
                return new ProfanityCheckerTestFeature();
            default:
                return new ProfanityCheckerBaseFeature();
        }
    }
}
