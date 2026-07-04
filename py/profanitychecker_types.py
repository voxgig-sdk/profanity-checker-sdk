# Typed models for the ProfanityChecker SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CheckProfanity:
    message: str
    flagged_word: Optional[list] = None
    is_profanity: Optional[bool] = None
    score: Optional[float] = None


@dataclass
class CheckProfanityCreateData:
    flagged_word: Optional[list] = None
    is_profanity: Optional[bool] = None
    message: Optional[str] = None
    score: Optional[float] = None

