# Typed models for the TempMailApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class TemporaryEmail:
    custom_domain: Optional[str] = None
    data: Optional[dict] = None
    prefix: Optional[str] = None
    success: Optional[bool] = None
    validity_period: Optional[int] = None


@dataclass
class TemporaryEmailLoadMatch:
    email: str
    message_id: str


@dataclass
class TemporaryEmailCreateData:
    custom_domain: Optional[str] = None
    data: Optional[dict] = None
    prefix: Optional[str] = None
    success: Optional[bool] = None
    validity_period: Optional[int] = None


@dataclass
class TemporaryEmailRemoveMatch:
    email: str

