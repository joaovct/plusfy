export function connectUser(){
    function getHashParams() {
        const hash = window.location.hash.substring(1)
        let params = {
            access_token: '',
            refresh_token: '',
            user_id: ''
        }
        hash.split('&').forEach((item: string) => {
            if(item){
                const parts: Array<string> = item.split('=')
                params = {...params, [parts[0]]: parts[1]}
            }
        })

        return params
    }

    const params = getHashParams()
    if(params.access_token && params.refresh_token && params.user_id){
        sessionStorage.setItem('access_token', params.access_token)
        sessionStorage.setItem('refresh_token', params.refresh_token)
        sessionStorage.setItem('user_id', params.user_id)
    }
}

export function disconnectUser(){
    sessionStorage.setItem('access_token', '')
    sessionStorage.setItem('refresh_token', '')
}

export function isUserConnected(){

    return {
        connected: sessionStorage.getItem('access_token') && sessionStorage.getItem('refresh_token') && sessionStorage.getItem('user_id') ? true : false,
        accessToken: sessionStorage.getItem('access_token') || '',
        refreshToken: sessionStorage.getItem('refresh_token') || '',
    }
}