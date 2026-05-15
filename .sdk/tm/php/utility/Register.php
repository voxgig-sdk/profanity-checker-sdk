<?php
declare(strict_types=1);

// ProfanityChecker SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

ProfanityCheckerUtility::setRegistrar(function (ProfanityCheckerUtility $u): void {
    $u->clean = [ProfanityCheckerClean::class, 'call'];
    $u->done = [ProfanityCheckerDone::class, 'call'];
    $u->make_error = [ProfanityCheckerMakeError::class, 'call'];
    $u->feature_add = [ProfanityCheckerFeatureAdd::class, 'call'];
    $u->feature_hook = [ProfanityCheckerFeatureHook::class, 'call'];
    $u->feature_init = [ProfanityCheckerFeatureInit::class, 'call'];
    $u->fetcher = [ProfanityCheckerFetcher::class, 'call'];
    $u->make_fetch_def = [ProfanityCheckerMakeFetchDef::class, 'call'];
    $u->make_context = [ProfanityCheckerMakeContext::class, 'call'];
    $u->make_options = [ProfanityCheckerMakeOptions::class, 'call'];
    $u->make_request = [ProfanityCheckerMakeRequest::class, 'call'];
    $u->make_response = [ProfanityCheckerMakeResponse::class, 'call'];
    $u->make_result = [ProfanityCheckerMakeResult::class, 'call'];
    $u->make_point = [ProfanityCheckerMakePoint::class, 'call'];
    $u->make_spec = [ProfanityCheckerMakeSpec::class, 'call'];
    $u->make_url = [ProfanityCheckerMakeUrl::class, 'call'];
    $u->param = [ProfanityCheckerParam::class, 'call'];
    $u->prepare_auth = [ProfanityCheckerPrepareAuth::class, 'call'];
    $u->prepare_body = [ProfanityCheckerPrepareBody::class, 'call'];
    $u->prepare_headers = [ProfanityCheckerPrepareHeaders::class, 'call'];
    $u->prepare_method = [ProfanityCheckerPrepareMethod::class, 'call'];
    $u->prepare_params = [ProfanityCheckerPrepareParams::class, 'call'];
    $u->prepare_path = [ProfanityCheckerPreparePath::class, 'call'];
    $u->prepare_query = [ProfanityCheckerPrepareQuery::class, 'call'];
    $u->result_basic = [ProfanityCheckerResultBasic::class, 'call'];
    $u->result_body = [ProfanityCheckerResultBody::class, 'call'];
    $u->result_headers = [ProfanityCheckerResultHeaders::class, 'call'];
    $u->transform_request = [ProfanityCheckerTransformRequest::class, 'call'];
    $u->transform_response = [ProfanityCheckerTransformResponse::class, 'call'];
});
