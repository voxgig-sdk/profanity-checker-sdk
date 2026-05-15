package voxgigprofanitycheckersdk

import (
	"github.com/voxgig-sdk/profanity-checker-sdk/core"
	"github.com/voxgig-sdk/profanity-checker-sdk/entity"
	"github.com/voxgig-sdk/profanity-checker-sdk/feature"
	_ "github.com/voxgig-sdk/profanity-checker-sdk/utility"
)

// Type aliases preserve external API.
type ProfanityCheckerSDK = core.ProfanityCheckerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ProfanityCheckerEntity = core.ProfanityCheckerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ProfanityCheckerError = core.ProfanityCheckerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCheckProfanityEntityFunc = func(client *core.ProfanityCheckerSDK, entopts map[string]any) core.ProfanityCheckerEntity {
		return entity.NewCheckProfanityEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewProfanityCheckerSDK = core.NewProfanityCheckerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
