package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCheckProfanityEntityFunc func(client *ProfanityCheckerSDK, entopts map[string]any) ProfanityCheckerEntity

