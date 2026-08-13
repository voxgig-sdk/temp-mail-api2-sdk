// Typed models for the TempMailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface TemporaryEmail {
  attachments?: any[]
  body?: string
  customDomain?: string
  customDomainAvailable?: boolean
  domains?: any[]
  email?: string
  expiresAt?: string
  from?: string
  htmlBody?: string
  id?: string
  inboxUrl?: string
  isRead?: boolean
  messages?: any[]
  prefix?: string
  receivedAt?: string
  subject?: string
  to?: string
  token?: string
  total?: number
  validityPeriod?: number
}

export interface TemporaryEmailLoadMatch {
  email?: string
  message_id?: string
}

export interface TemporaryEmailCreateData {
  attachments?: any[]
  body?: string
  customDomain?: string
  customDomainAvailable?: boolean
  domains?: any[]
  email?: string
  expiresAt?: string
  from?: string
  htmlBody?: string
  id?: string
  inboxUrl?: string
  isRead?: boolean
  messages?: any[]
  prefix?: string
  receivedAt?: string
  subject?: string
  to?: string
  token?: string
  total?: number
  validityPeriod?: number
}

export interface TemporaryEmailRemoveMatch {
  email: string
}

