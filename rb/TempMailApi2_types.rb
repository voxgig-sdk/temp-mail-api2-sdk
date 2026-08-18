# frozen_string_literal: true

# Typed models for the TempMailApi2 SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# TemporaryEmail entity data model.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] customDomain
#   @return [String, nil]
#
# @!attribute [rw] customDomainAvailable
#   @return [Boolean, nil]
#
# @!attribute [rw] domains
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] htmlBody
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] isRead
#   @return [Boolean, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] prefix
#   @return [String, nil]
#
# @!attribute [rw] receivedAt
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] validityPeriod
#   @return [Integer, nil]
TemporaryEmail = Struct.new(
  :attachments,
  :body,
  :customDomain,
  :customDomainAvailable,
  :domains,
  :email,
  :expiresAt,
  :from,
  :htmlBody,
  :id,
  :inboxUrl,
  :isRead,
  :messages,
  :prefix,
  :receivedAt,
  :subject,
  :to,
  :token,
  :total,
  :validityPeriod,
  keyword_init: true
)

# Request payload for TemporaryEmail#load.
#
# @!attribute [rw] email
#   @return [String]
#
# @!attribute [rw] message_id
#   @return [String]
TemporaryEmailLoadMatch = Struct.new(
  :email,
  :message_id,
  keyword_init: true
)

# Request payload for TemporaryEmail#create.
#
# @!attribute [rw] attachments
#   @return [Array, nil]
#
# @!attribute [rw] body
#   @return [String, nil]
#
# @!attribute [rw] customDomain
#   @return [String, nil]
#
# @!attribute [rw] customDomainAvailable
#   @return [Boolean, nil]
#
# @!attribute [rw] domains
#   @return [Array, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] expiresAt
#   @return [String, nil]
#
# @!attribute [rw] from
#   @return [String, nil]
#
# @!attribute [rw] htmlBody
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] inboxUrl
#   @return [String, nil]
#
# @!attribute [rw] isRead
#   @return [Boolean, nil]
#
# @!attribute [rw] messages
#   @return [Array, nil]
#
# @!attribute [rw] prefix
#   @return [String, nil]
#
# @!attribute [rw] receivedAt
#   @return [String, nil]
#
# @!attribute [rw] subject
#   @return [String, nil]
#
# @!attribute [rw] to
#   @return [String, nil]
#
# @!attribute [rw] token
#   @return [String, nil]
#
# @!attribute [rw] total
#   @return [Integer, nil]
#
# @!attribute [rw] validityPeriod
#   @return [Integer, nil]
TemporaryEmailCreateData = Struct.new(
  :attachments,
  :body,
  :customDomain,
  :customDomainAvailable,
  :domains,
  :email,
  :expiresAt,
  :from,
  :htmlBody,
  :id,
  :inboxUrl,
  :isRead,
  :messages,
  :prefix,
  :receivedAt,
  :subject,
  :to,
  :token,
  :total,
  :validityPeriod,
  keyword_init: true
)

# Request payload for TemporaryEmail#remove.
#
# @!attribute [rw] email
#   @return [String]
TemporaryEmailRemoveMatch = Struct.new(
  :email,
  keyword_init: true
)

