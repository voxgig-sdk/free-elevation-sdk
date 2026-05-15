package voxgigfreeelevationsdk

import (
	"github.com/voxgig-sdk/free-elevation-sdk/core"
	"github.com/voxgig-sdk/free-elevation-sdk/entity"
	"github.com/voxgig-sdk/free-elevation-sdk/feature"
	_ "github.com/voxgig-sdk/free-elevation-sdk/utility"
)

// Type aliases preserve external API.
type FreeElevationSDK = core.FreeElevationSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type FreeElevationEntity = core.FreeElevationEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type FreeElevationError = core.FreeElevationError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewElevationEntityFunc = func(client *core.FreeElevationSDK, entopts map[string]any) core.FreeElevationEntity {
		return entity.NewElevationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewFreeElevationSDK = core.NewFreeElevationSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
