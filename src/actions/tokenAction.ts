import {IToken_action, TOKEN} from '../store/token/types'

const tokenAction = (accessToken: string, refreshToken: string) => {
    const actionReturn: IToken_action = {
        type: TOKEN,
        payload: {
            accessToken,
            refreshToken
        }
    }
    return actionReturn
}

export default tokenAction