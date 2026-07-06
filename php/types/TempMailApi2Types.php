<?php
declare(strict_types=1);

// Typed models for the TempMailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** TemporaryEmail entity data model. */
class TemporaryEmail
{
    public ?string $custom_domain = null;
    public ?array $data = null;
    public ?string $prefix = null;
    public ?bool $success = null;
    public ?int $validity_period = null;
}

/** Request payload for TemporaryEmail#load. */
class TemporaryEmailLoadMatch
{
    public string $email;
    public string $message_id;
}

/** Request payload for TemporaryEmail#create. */
class TemporaryEmailCreateData
{
    public ?string $custom_domain = null;
    public ?array $data = null;
    public ?string $prefix = null;
    public ?bool $success = null;
    public ?int $validity_period = null;
}

/** Request payload for TemporaryEmail#remove. */
class TemporaryEmailRemoveMatch
{
    public string $email;
}

