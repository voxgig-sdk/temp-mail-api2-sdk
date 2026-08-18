package voxgigtempmailapi2sdk

import (
	"github.com/voxgig-sdk/temp-mail-api2-sdk/go/core"
	"github.com/voxgig-sdk/temp-mail-api2-sdk/go/entity"
	"github.com/voxgig-sdk/temp-mail-api2-sdk/go/feature"
	_ "github.com/voxgig-sdk/temp-mail-api2-sdk/go/utility"
)

// Type aliases preserve external API.
type TempMailApi2SDK = core.TempMailApi2SDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type TempMailApi2Entity = core.TempMailApi2Entity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type TempMailApi2Error = core.TempMailApi2Error

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTemporaryEmailEntityFunc = func(client *core.TempMailApi2SDK, entopts map[string]any) core.TempMailApi2Entity {
		return entity.NewTemporaryEmailEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewTempMailApi2SDK = core.NewTempMailApi2SDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewTempMailApi2SDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *TempMailApi2SDK  { return NewTempMailApi2SDK(nil) }
func Test() *TempMailApi2SDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
