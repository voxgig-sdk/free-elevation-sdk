<?php
declare(strict_types=1);

// FreeElevation SDK utility registration

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

FreeElevationUtility::setRegistrar(function (FreeElevationUtility $u): void {
    $u->clean = [FreeElevationClean::class, 'call'];
    $u->done = [FreeElevationDone::class, 'call'];
    $u->make_error = [FreeElevationMakeError::class, 'call'];
    $u->feature_add = [FreeElevationFeatureAdd::class, 'call'];
    $u->feature_hook = [FreeElevationFeatureHook::class, 'call'];
    $u->feature_init = [FreeElevationFeatureInit::class, 'call'];
    $u->fetcher = [FreeElevationFetcher::class, 'call'];
    $u->make_fetch_def = [FreeElevationMakeFetchDef::class, 'call'];
    $u->make_context = [FreeElevationMakeContext::class, 'call'];
    $u->make_options = [FreeElevationMakeOptions::class, 'call'];
    $u->make_request = [FreeElevationMakeRequest::class, 'call'];
    $u->make_response = [FreeElevationMakeResponse::class, 'call'];
    $u->make_result = [FreeElevationMakeResult::class, 'call'];
    $u->make_point = [FreeElevationMakePoint::class, 'call'];
    $u->make_spec = [FreeElevationMakeSpec::class, 'call'];
    $u->make_url = [FreeElevationMakeUrl::class, 'call'];
    $u->param = [FreeElevationParam::class, 'call'];
    $u->prepare_auth = [FreeElevationPrepareAuth::class, 'call'];
    $u->prepare_body = [FreeElevationPrepareBody::class, 'call'];
    $u->prepare_headers = [FreeElevationPrepareHeaders::class, 'call'];
    $u->prepare_method = [FreeElevationPrepareMethod::class, 'call'];
    $u->prepare_params = [FreeElevationPrepareParams::class, 'call'];
    $u->prepare_path = [FreeElevationPreparePath::class, 'call'];
    $u->prepare_query = [FreeElevationPrepareQuery::class, 'call'];
    $u->result_basic = [FreeElevationResultBasic::class, 'call'];
    $u->result_body = [FreeElevationResultBody::class, 'call'];
    $u->result_headers = [FreeElevationResultHeaders::class, 'call'];
    $u->transform_request = [FreeElevationTransformRequest::class, 'call'];
    $u->transform_response = [FreeElevationTransformResponse::class, 'call'];
});
