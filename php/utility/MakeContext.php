<?php
declare(strict_types=1);

// TempMailApi2 SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class TempMailApi2MakeContext
{
    public static function call(array $ctxmap, ?TempMailApi2Context $basectx): TempMailApi2Context
    {
        return new TempMailApi2Context($ctxmap, $basectx);
    }
}
