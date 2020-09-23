import React, { FunctionComponent, useCallback } from 'react'
import { IPrivateRoute } from '../../utils/types'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Iuser } from '../../store/user/types'
import NotPremium from '../home/NotPremium'
import useDispatchUser from '../../hooks/useDispatchUser'
import useDispatchToken from '../../hooks/useDispatchToken'
import Header from './Header'
import styled from 'styled-components'
import usePlaybackSDK from '../../hooks/usePlaybackSDK'

const PrivateRoute: FunctionComponent<IPrivateRoute> = ({Component, accessToken, refreshToken}) => {
    usePlaybackSDK()
    useDispatchUser(accessToken)
    useDispatchToken(accessToken, refreshToken)
    
    const user = useSelector<Istore, Iuser>(store => store.user)

    const userIsPremium = useCallback(() => (
        Object.keys(user).length && user.product !== "premium" ? false : true
    ),[user])

    return <WrapperComponent>
        <Header/>
        <Component/>
        {userIsPremium() ? <></> : <NotPremium/>}
    </WrapperComponent>
}

export default PrivateRoute

const WrapperComponent = styled.div`
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
`