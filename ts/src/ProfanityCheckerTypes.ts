// Typed models for the ProfanityChecker SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CheckProfanity {
  flagged_word?: any[]
  is_profanity?: boolean
  message: string
  score?: number
}

export interface CheckProfanityCreateData {
  flagged_word?: any[]
  is_profanity?: boolean
  message: string
  score?: number
}

