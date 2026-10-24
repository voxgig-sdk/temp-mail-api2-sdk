# Typed models for the TempMailApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


TemporaryEmail = TypedDict('TemporaryEmail', {
    "attachments": list,
    "body": str,
    "customDomain": str,
    "customDomainAvailable": bool,
    "domains": list,
    "email": str,
    "expiresAt": str,
    "from": str,
    "htmlBody": str,
    "id": str,
    "inboxUrl": str,
    "isRead": bool,
    "messages": list,
    "prefix": str,
    "receivedAt": str,
    "subject": str,
    "to": str,
    "token": str,
    "total": int,
    "validityPeriod": int,
}, total=False)


class TemporaryEmailLoadMatch(TypedDict):
    email: str
    message_id: str


class TemporaryEmailCreateData(TypedDict, total=False):
    customDomain: str
    prefix: str
    validityPeriod: int


class TemporaryEmailRemoveMatch(TypedDict):
    email: str
