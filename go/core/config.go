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
				"name": "X-API-Key",
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
						"title": "Attachments",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "body",
						"title": "Body",
						"type": "`$STRING`",
						"short": "Email body content",
					},
					map[string]any{
						"name": "customDomain",
						"title": "Custom Domain",
						"type": "`$STRING`",
						"short": "Custom domain for professional temporary email",
					},
					map[string]any{
						"name": "customDomainAvailable",
						"title": "Custom Domain Available",
						"type": "`$BOOLEAN`",
						"short": "Whether custom domains are supported",
					},
					map[string]any{
						"name": "domains",
						"title": "Domains",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Generated temporary email address",
						"format": "email",
					},
					map[string]any{
						"name": "expiresAt",
						"title": "Expires At",
						"type": "`$STRING`",
						"short": "Expiration date of the temporary email",
						"format": "date-time",
					},
					map[string]any{
						"name": "from",
						"title": "From",
						"type": "`$STRING`",
						"short": "Sender email address",
						"format": "email",
					},
					map[string]any{
						"name": "htmlBody",
						"title": "Html Body",
						"type": "`$STRING`",
						"short": "HTML version of email body",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Unique message identifier",
					},
					map[string]any{
						"name": "inboxUrl",
						"title": "Inbox Url",
						"type": "`$STRING`",
						"short": "URL to access the inbox",
						"format": "uri",
					},
					map[string]any{
						"name": "isRead",
						"title": "Is Read",
						"type": "`$BOOLEAN`",
						"short": "Whether the message has been read",
					},
					map[string]any{
						"name": "messages",
						"title": "Messages",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "prefix",
						"title": "Prefix",
						"type": "`$STRING`",
						"short": "Desired prefix for the email address",
					},
					map[string]any{
						"name": "receivedAt",
						"title": "Received At",
						"type": "`$STRING`",
						"short": "When the email was received",
						"format": "date-time",
					},
					map[string]any{
						"name": "subject",
						"title": "Subject",
						"type": "`$STRING`",
						"short": "Email subject",
					},
					map[string]any{
						"name": "to",
						"title": "To",
						"type": "`$STRING`",
						"short": "Recipient email address",
						"format": "email",
					},
					map[string]any{
						"name": "token",
						"title": "Token",
						"type": "`$STRING`",
						"short": "Access token for managing this email address",
					},
					map[string]any{
						"name": "total",
						"title": "Total",
						"type": "`$INTEGER`",
						"short": "Total number of messages",
					},
					map[string]any{
						"name": "validityPeriod",
						"title": "Validity Period",
						"type": "`$INTEGER`",
						"short": "Validity period in days (default: 60+ days)",
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
								"parts": []any{
									"temp-mail",
									"generate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"temp-mail",
									"{email}",
									"inbox",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "user123@tempmail.boomlify.com",
										},
									},
									"query": []any{
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
										map[string]any{
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"limit",
										"offset",
									},
								},
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/temp-mail/{email}/messages/{messageId}",
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "message_id",
											"orig": "message_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
										"message_id",
									},
								},
							},
							map[string]any{
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
								"parts": []any{
									"temp-mail",
									"domains",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.data`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"temp-mail",
									"{email}",
									"delete",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"email",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
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
