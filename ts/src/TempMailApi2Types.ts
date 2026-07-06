// Typed models for the TempMailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface TemporaryEmail {
  custom_domain?: string
  data?: Record<string, any>
  prefix?: string
  success?: boolean
  validity_period?: number
}

export interface TemporaryEmailLoadMatch {
  email: string
  message_id: string
}

export interface TemporaryEmailCreateData {
  custom_domain?: string
  data?: Record<string, any>
  prefix?: string
  success?: boolean
  validity_period?: number
}

export interface TemporaryEmailRemoveMatch {
  email: string
}

