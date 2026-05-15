package core

type ProfanityCheckerError struct {
	IsProfanityCheckerError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewProfanityCheckerError(code string, msg string, ctx *Context) *ProfanityCheckerError {
	return &ProfanityCheckerError{
		IsProfanityCheckerError: true,
		Sdk:              "ProfanityChecker",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ProfanityCheckerError) Error() string {
	return e.Msg
}
