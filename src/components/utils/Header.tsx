import React, { FunctionComponent, useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Logo, colors, metrics} from '../../styles/style'
import logoSrc from '../../assets/logo-minified.png'
import emptyUserPhoto from '../../assets/empty-user-photo.svg'
import { useSelector } from 'react-redux'
import { Istore } from '../../store/types'
import { Iuser } from '../../store/user/types'

const Header: FunctionComponent = () => {
    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector<Istore, Iuser>(store => store.user)

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

const photoSize = '50px'
const photoPadding = '15px'

const Options = styled.ul<{show: boolean}>`
    border: 1px solid ${colors.border};
    border-radius: 14px;
    margin: 10px 0 0 0;
    box-shadow: 0 6px 12px 0px rgba(0,0,0,0.16);
    transition: .5s opacity;
    opacity: 0;
    pointer-events: none;
    user-select: none;
    position: absolute;
    z-index: 2;
    top: 65px;
    background: ${colors.background};
    min-width: 175px;

    ${ ({show}) => 
    show ? `
        opacity: 1;
        pointer-events: all;
        user-select: text;
    ` : ''
    }

    li{
        a{
            display: block;
            text-align: left;
            padding: ${photoPadding};
            font-size: 16px;
        }
        &:first-of-type a{
            padding-bottom: calc(${photoPadding} / 2);
        }
        &:last-of-type{
            padding-top: calc(${photoPadding} / 2);
        }
    }
`

const HeaderUserPhoto = styled.div`
    position: relative;
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
    figure{
        height: calc(${photoSize} + ${photoPadding});
        width: calc(${photoSize} + ${photoPadding});
        border: 1px solid ${colors.border};
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        img{
            height: ${photoSize};
            width: ${photoSize};
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
    padding: ${metrics.spacing3} ${metrics.spacing5} ${metrics.spacing5} ${metrics.spacing5};

    a{
        text-decoration: none;
    }

    @media(max-width: 576px){
        padding: ${metrics.spacing3};
    }
`