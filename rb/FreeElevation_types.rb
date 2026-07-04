# frozen_string_literal: true

# Typed models for the FreeElevation SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Elevation entity data model.
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
Elevation = Struct.new(
  :elevation,
  :latitude,
  :longitude,
  keyword_init: true
)

# Request payload for Elevation#load.
#
# @!attribute [rw] lat
#   @return [Float]
#
# @!attribute [rw] lon
#   @return [Float]
ElevationLoadMatch = Struct.new(
  :lat,
  :lon,
  keyword_init: true
)

# Match filter for Elevation#list (any subset of Elevation fields).
#
# @!attribute [rw] elevation
#   @return [Float, nil]
#
# @!attribute [rw] latitude
#   @return [Float, nil]
#
# @!attribute [rw] longitude
#   @return [Float, nil]
ElevationListMatch = Struct.new(
  :elevation,
  :latitude,
  :longitude,
  keyword_init: true
)

