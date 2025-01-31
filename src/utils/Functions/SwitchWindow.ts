import { Dispatch, SetStateAction } from "react";

interface IFunction {
    auth?: boolean
    reg?: boolean
    home?: boolean
    mine?: boolean
    boost?: boolean
    earn?: boolean
    buttons?: boolean
}

interface IFunctionReq {
    auth: boolean
    reg: boolean
    home: boolean
    mine: boolean
    boost: boolean
    earn: boolean
    buttons: boolean
}

export function SwitchWindow(func: Dispatch<SetStateAction<IFunctionReq>> | undefined, args: IFunction) {
    func?.({
        auth: false,
        reg: false,
        home: false,
        mine: false,
        boost: false,
        earn: false,
        buttons: false,
        ...args,
    })
}