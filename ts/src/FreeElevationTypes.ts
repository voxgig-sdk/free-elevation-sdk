// Typed models for the FreeElevation SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Elevation {
  elevation?: number
  latitude?: number
  longitude?: number
}

export interface ElevationLoadMatch {
  lat: number
  lon: number
}

export type ElevationListMatch = Partial<Elevation>

