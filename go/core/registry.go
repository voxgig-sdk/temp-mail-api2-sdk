package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTemporaryEmailEntityFunc func(client *TempMailApi2SDK, entopts map[string]any) TempMailApi2Entity

