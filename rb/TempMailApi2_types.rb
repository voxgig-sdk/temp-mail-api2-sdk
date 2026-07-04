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
# @!attribute [rw] custom_domain
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] prefix
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] validity_period
#   @return [Integer, nil]
TemporaryEmail = Struct.new(
  :custom_domain,
  :data,
  :prefix,
  :success,
  :validity_period,
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

# Match filter for TemporaryEmail#create (any subset of TemporaryEmail fields).
#
# @!attribute [rw] custom_domain
#   @return [String, nil]
#
# @!attribute [rw] data
#   @return [Hash, nil]
#
# @!attribute [rw] prefix
#   @return [String, nil]
#
# @!attribute [rw] success
#   @return [Boolean, nil]
#
# @!attribute [rw] validity_period
#   @return [Integer, nil]
TemporaryEmailCreateData = Struct.new(
  :custom_domain,
  :data,
  :prefix,
  :success,
  :validity_period,
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

