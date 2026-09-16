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
			"slug": "temp-mail-api2",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
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
						"short": "Email body content",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customDomain",
						"short": "Custom domain for professional temporary email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "customDomainAvailable",
						"short": "Whether custom domains are supported",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"format": "email",
						"name": "email",
						"short": "Generated temporary email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "expiresAt",
						"short": "Expiration date of the temporary email",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "from",
						"short": "Sender email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "htmlBody",
						"short": "HTML version of email body",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique message identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "uri",
						"name": "inboxUrl",
						"short": "URL to access the inbox",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isRead",
						"short": "Whether the message has been read",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "messages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefix",
						"short": "Desired prefix for the email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "date-time",
						"name": "receivedAt",
						"short": "When the email was received",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subject",
						"short": "Email subject",
						"type": "`$STRING`",
					},
					map[string]any{
						"format": "email",
						"name": "to",
						"short": "Recipient email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "token",
						"short": "Access token for managing this email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "total",
						"short": "Total number of messages",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "validityPeriod",
						"short": "Validity period in days (default: 60+ days)",
						"type": "`$INTEGER`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "temp-mail",
									},
									map[string]any{
										"lit": "generate",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"temp-mail",
									"generate",
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
								"segments": []any{
									map[string]any{
										"lit": "temp-mail",
									},
									map[string]any{
										"var": "email",
									},
									map[string]any{
										"lit": "inbox",
									},
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
								"parts": []any{
									"temp-mail",
									"{email}",
									"inbox",
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
								"rename": map[string]any{
									"param": map[string]any{
										"messageId": "message_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "temp-mail",
									},
									map[string]any{
										"var": "email",
									},
									map[string]any{
										"lit": "messages",
									},
									map[string]any{
										"var": "message_id",
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
								"parts": []any{
									"temp-mail",
									"{email}",
									"messages",
									"{message_id}",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/temp-mail/domains",
								"segments": []any{
									map[string]any{
										"lit": "temp-mail",
									},
									map[string]any{
										"lit": "domains",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"parts": []any{
									"temp-mail",
									"domains",
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
								"segments": []any{
									map[string]any{
										"lit": "temp-mail",
									},
									map[string]any{
										"var": "email",
									},
									map[string]any{
										"lit": "delete",
									},
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
								"parts": []any{
									"temp-mail",
									"{email}",
									"delete",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
