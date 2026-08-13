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
    public ?array $attachments = null;
    public ?string $body = null;
    public ?string $customDomain = null;
    public ?bool $customDomainAvailable = null;
    public ?array $domains = null;
    public ?string $email = null;
    public ?string $expiresAt = null;
    public ?string $from = null;
    public ?string $htmlBody = null;
    public ?string $id = null;
    public ?string $inboxUrl = null;
    public ?bool $isRead = null;
    public ?array $messages = null;
    public ?string $prefix = null;
    public ?string $receivedAt = null;
    public ?string $subject = null;
    public ?string $to = null;
    public ?string $token = null;
    public ?int $total = null;
    public ?int $validityPeriod = null;
}

/** Request payload for TemporaryEmail#load. */
class TemporaryEmailLoadMatch
{
    public ?string $email = null;
    public ?string $message_id = null;
}

/** Request payload for TemporaryEmail#create. */
class TemporaryEmailCreateData
{
    public ?array $attachments = null;
    public ?string $body = null;
    public ?string $customDomain = null;
    public ?bool $customDomainAvailable = null;
    public ?array $domains = null;
    public ?string $email = null;
    public ?string $expiresAt = null;
    public ?string $from = null;
    public ?string $htmlBody = null;
    public ?string $id = null;
    public ?string $inboxUrl = null;
    public ?bool $isRead = null;
    public ?array $messages = null;
    public ?string $prefix = null;
    public ?string $receivedAt = null;
    public ?string $subject = null;
    public ?string $to = null;
    public ?string $token = null;
    public ?int $total = null;
    public ?int $validityPeriod = null;
}

/** Request payload for TemporaryEmail#remove. */
class TemporaryEmailRemoveMatch
{
    public string $email;
}

