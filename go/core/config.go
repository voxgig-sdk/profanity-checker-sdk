package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "ProfanityChecker",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://vector.profanity.dev",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"check_profanity": map[string]any{},
			},
		},
		"entity": map[string]any{
			"check_profanity": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "flagged_word",
						"req": false,
						"type": "`$ARRAY`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "is_profanity",
						"req": false,
						"type": "`$BOOLEAN`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "message",
						"req": true,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "score",
						"req": false,
						"type": "`$NUMBER`",
						"index$": 3,
					},
				},
				"name": "check_profanity",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{},
								"method": "POST",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "create",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
