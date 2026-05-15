package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewElevationEntityFunc func(client *FreeElevationSDK, entopts map[string]any) FreeElevationEntity

