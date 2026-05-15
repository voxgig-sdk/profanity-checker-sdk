<?php
declare(strict_types=1);

// ProfanityChecker SDK base feature

class ProfanityCheckerBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ProfanityCheckerContext $ctx, array $options): void {}
    public function PostConstruct(ProfanityCheckerContext $ctx): void {}
    public function PostConstructEntity(ProfanityCheckerContext $ctx): void {}
    public function SetData(ProfanityCheckerContext $ctx): void {}
    public function GetData(ProfanityCheckerContext $ctx): void {}
    public function GetMatch(ProfanityCheckerContext $ctx): void {}
    public function SetMatch(ProfanityCheckerContext $ctx): void {}
    public function PrePoint(ProfanityCheckerContext $ctx): void {}
    public function PreSpec(ProfanityCheckerContext $ctx): void {}
    public function PreRequest(ProfanityCheckerContext $ctx): void {}
    public function PreResponse(ProfanityCheckerContext $ctx): void {}
    public function PreResult(ProfanityCheckerContext $ctx): void {}
    public function PreDone(ProfanityCheckerContext $ctx): void {}
    public function PreUnexpected(ProfanityCheckerContext $ctx): void {}
}
