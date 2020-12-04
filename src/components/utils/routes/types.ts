import { FunctionComponent } from "react";

export interface IPrivateRoute{
    Component: FunctionComponent
    accessToken: string
    refreshToken: string
    expiresIn: number
}