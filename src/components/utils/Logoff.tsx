import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { USER_LOGOFF } from '../../store/user/types';
import { disconnectUser, isUserConnected } from '../../utils/userAccess';

const Logoff: React.FC = () => {
    disconnectUser()
    const response = isUserConnected()
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch( () => {
            return {type: USER_LOGOFF, status: 'loggof', payload: {}}
        })
    },[dispatch])

    return response.connected
        ? <Redirect to="/home" />
        : <Redirect to="/" />
}

export default Logoff