package core

type FreeElevationError struct {
	IsFreeElevationError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreeElevationError(code string, msg string, ctx *Context) *FreeElevationError {
	return &FreeElevationError{
		IsFreeElevationError: true,
		Sdk:              "FreeElevation",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreeElevationError) Error() string {
	return e.Msg
}
