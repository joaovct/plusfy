import React, { FunctionComponent, useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Logo, colors, metrics, Dropdown, breakpoints} from '../../../styles/style'
import logoSrc from '../../../assets/logo-minified.png'
import emptyUserPhoto from '../../../assets/empty-user-photo.svg'
import { IStore } from '../../../redux/store/types'
import { IUser } from '../../../redux/store/user/types'

const Header: FunctionComponent = () => {
    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector<IStore, IUser>(store => store.user)

    const toggleOptions = () => {
        setShowOptions(value => !value)
    }

    return(
        <HeaderWrapper>
            <HeaderInner>
                <Link to="/home">
                    <Logo src={logoSrc}/>
                </Link>
                <HeaderUserPhoto>
                    <figure onClick={toggleOptions}>
                        <img alt="profile" src={ Object.keys(user).length && user.images[0] ? user.images[0].url : emptyUserPhoto }/>
                    </figure>
                    <Options show={showOptions}>
                        <li>
                            <a href="https://github.com/joaodjtr" target="_blank" rel="noopener noreferrer">Quem fez isto?</a>
                        </li>
                        <li>
                            <Link to="/logoff">Sair</Link>
                        </li>
                    </Options>
                </HeaderUserPhoto>
            </HeaderInner>
        </HeaderWrapper>
    )
}

export default Header

const Options = styled(Dropdown)`
    top:  calc(var(--photoSize) + var(--photoPadding));
    right: inherit;
    left: inherit;

    li{
        a{
            padding: var(--photoPadding);
        }
        &:first-of-type a{
            padding-bottom: calc(var(--photoPadding) / 2);
        }
        &:last-of-type{
            padding-top: calc(var(--photoPadding) / 2);
        }
    }
`

const HeaderUserPhoto = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    figure{
        height: calc(var(--photoSize) + var(--photoPadding));
        width: calc(var(--photoSize) + var(--photoPadding));
        border: 1px solid ${colors.border};
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img{
            height: var(--photoSize);
            width: var(--photoSize);
            border-radius: 100%;
        }
    }
`

const HeaderInner = styled.div`
    max-width: ${metrics.maxWidthContainer};
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const HeaderWrapper = styled.header`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: ${metrics.spacing3} var(--spacingSidesPage) var(--spacingSidesPage) var(--spacingSidesPage); 
    --photoSize: 50px;
    --photoPadding: 15px;

    a{
        text-decoration: none;
    }

    @media(max-width: ${breakpoints.tbp}){
        --photoSize: 45px;
    }
    
`