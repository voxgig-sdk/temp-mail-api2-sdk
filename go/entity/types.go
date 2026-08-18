// Typed models for the TempMailApi2 SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/temp-mail-api2-sdk/go/core"
)

// TemporaryEmail is the typed data model for the temporary_email entity.
type TemporaryEmail struct {
	Attachments *[]any `json:"attachments,omitempty"`
	Body *string `json:"body,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	CustomDomainAvailable *bool `json:"customDomainAvailable,omitempty"`
	Domains *[]any `json:"domains,omitempty"`
	Email *string `json:"email,omitempty"`
	ExpiresAt *string `json:"expiresAt,omitempty"`
	From *string `json:"from,omitempty"`
	HtmlBody *string `json:"htmlBody,omitempty"`
	Id *string `json:"id,omitempty"`
	InboxUrl *string `json:"inboxUrl,omitempty"`
	IsRead *bool `json:"isRead,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Prefix *string `json:"prefix,omitempty"`
	ReceivedAt *string `json:"receivedAt,omitempty"`
	Subject *string `json:"subject,omitempty"`
	To *string `json:"to,omitempty"`
	Token *string `json:"token,omitempty"`
	Total *int `json:"total,omitempty"`
	ValidityPeriod *int `json:"validityPeriod,omitempty"`
}

// TemporaryEmailLoadMatch is the typed request payload for TemporaryEmail.LoadTyped.
type TemporaryEmailLoadMatch struct {
	Email string `json:"email"`
	MessageId string `json:"message_id"`
}

// TemporaryEmailCreateData is the typed request payload for TemporaryEmail.CreateTyped.
type TemporaryEmailCreateData struct {
	Attachments *[]any `json:"attachments,omitempty"`
	Body *string `json:"body,omitempty"`
	CustomDomain *string `json:"customDomain,omitempty"`
	CustomDomainAvailable *bool `json:"customDomainAvailable,omitempty"`
	Domains *[]any `json:"domains,omitempty"`
	Email *string `json:"email,omitempty"`
	ExpiresAt *string `json:"expiresAt,omitempty"`
	From *string `json:"from,omitempty"`
	HtmlBody *string `json:"htmlBody,omitempty"`
	Id *string `json:"id,omitempty"`
	InboxUrl *string `json:"inboxUrl,omitempty"`
	IsRead *bool `json:"isRead,omitempty"`
	Messages *[]any `json:"messages,omitempty"`
	Prefix *string `json:"prefix,omitempty"`
	ReceivedAt *string `json:"receivedAt,omitempty"`
	Subject *string `json:"subject,omitempty"`
	To *string `json:"to,omitempty"`
	Token *string `json:"token,omitempty"`
	Total *int `json:"total,omitempty"`
	ValidityPeriod *int `json:"validityPeriod,omitempty"`
}

// TemporaryEmailRemoveMatch is the typed request payload for TemporaryEmail.RemoveTyped.
type TemporaryEmailRemoveMatch struct {
	Email string `json:"email"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
