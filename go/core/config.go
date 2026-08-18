package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "TempMailApi2",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.boomlify.com/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"temporary_email": map[string]any{},
			},
		},
		"entity": map[string]any{
			"temporary_email": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "attachments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customDomain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customDomainAvailable",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expiresAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "from",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "htmlBody",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "inboxUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isRead",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "messages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "receivedAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validityPeriod",
						"type": "`$INTEGER`",
					},
				},
				"name": "temporary_email",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/temp-mail/generate",
								"parts": []any{
									"temp-mail",
									"generate",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "user123@tempmail.boomlify.com",
											"kind": "param",
											"name": "email",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/temp-mail/{email}/inbox",
								"parts": []any{
									"temp-mail",
									"{email}",
									"inbox",
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"limit",
										"offset",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "email",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "message_id",
											"orig": "message_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/temp-mail/{email}/messages/{messageId}",
								"parts": []any{
									"temp-mail",
									"{email}",
									"messages",
									"{message_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "message_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"message_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/temp-mail/domains",
								"parts": []any{
									"temp-mail",
									"domains",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "email",
											"orig": "email",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/temp-mail/{email}/delete",
								"parts": []any{
									"temp-mail",
									"{email}",
									"delete",
								},
								"select": map[string]any{
									"exist": []any{
										"email",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"temp_mail",
						},
						[]any{
							"temp_mail",
							"message",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
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
