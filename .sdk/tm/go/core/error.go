package core

type IpAddressLookupError struct {
	IsIpAddressLookupError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewIpAddressLookupError(code string, msg string, ctx *Context) *IpAddressLookupError {
	return &IpAddressLookupError{
		IsIpAddressLookupError: true,
		Sdk:              "IpAddressLookup",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *IpAddressLookupError) Error() string {
	return e.Msg
}
