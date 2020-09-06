import {useEffect, useState} from 'react'
import socketIOClient from 'socket.io-client'


interface Isocket{
    socket?: SocketIOClient.Socket
}

const useConnectSocket = () => {
    const [socket, setSocket] = useState<Isocket>({})

    useEffect(() => {
        setSocket({socket: socketIOClient(process.env.REACT_APP_SERVER_URL || '')})
    },[])

    return socket
}

export default useConnectSocket