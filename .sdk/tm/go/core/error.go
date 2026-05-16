package core

type TempMailApi2Error struct {
	IsTempMailApi2Error bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTempMailApi2Error(code string, msg string, ctx *Context) *TempMailApi2Error {
	return &TempMailApi2Error{
		IsTempMailApi2Error: true,
		Sdk:              "TempMailApi2",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TempMailApi2Error) Error() string {
	return e.Msg
}
