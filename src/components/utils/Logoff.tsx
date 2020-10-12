import React from 'react';
import { Redirect } from 'react-router-dom';
import { disconnectUser, isUserConnected } from '../../utils/userAccess';

const Logoff: React.FC = () => {
    disconnectUser()
    const response = isUserConnected()

    return response.connected
        ? <Redirect to="/home" />
        : <Redirect to="/" />
}

export default Logoff