# frozen_string_literal: true

# Typed models for the ProfanityChecker SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CheckProfanity entity data model.
#
# @!attribute [rw] flaggedWords
#   @return [Array, nil]
#
# @!attribute [rw] isProfanity
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] score
#   @return [Float, nil]
CheckProfanity = Struct.new(
  :flaggedWords,
  :isProfanity,
  :message,
  :score,
  keyword_init: true
)

# Request payload for CheckProfanity#create.
#
# @!attribute [rw] flaggedWords
#   @return [Array, nil]
#
# @!attribute [rw] isProfanity
#   @return [Boolean, nil]
#
# @!attribute [rw] message
#   @return [String]
#
# @!attribute [rw] score
#   @return [Float, nil]
CheckProfanityCreateData = Struct.new(
  :flaggedWords,
  :isProfanity,
  :message,
  :score,
  keyword_init: true
)

