import { useContext } from "react";
import { UserContext } from "../UserContext";

export function UseUser() {
    return useContext(UserContext)
}