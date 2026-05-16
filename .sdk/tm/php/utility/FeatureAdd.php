<?php
declare(strict_types=1);

// TempMailApi2 SDK utility: feature_add

class TempMailApi2FeatureAdd
{
    public static function call(TempMailApi2Context $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
