import React, { FunctionComponent, useState } from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {Logo, borderColor, backgroundColor} from './../../styles/style'
import logoSrc from '../../assets/logo-minified.png'

const HeaderHome: FunctionComponent = () => {
    const [showOptions, setShowOptions] = useState(false)

    const toggleOptions = () => {
        setShowOptions(value => !value)
    }

    return(
        <Header>
            <Logo src={logoSrc}/>
            <HeaderUserPhoto>
                <figure onClick={toggleOptions}>
                    <img alt="profile" src="https://instagram.fgru6-1.fna.fbcdn.net/v/t51.2885-19/s150x150/102399373_183979602940677_1188053993490743296_n.jpg?_nc_ht=instagram.fgru6-1.fna.fbcdn.net&_nc_ohc=kIgGg503pkQAX_l9er5&oh=53b66ce1970ac6beed3eec5a19f679f9&oe=5F5719AA"/>
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
        </Header>
    )
}

export default HeaderHome

const Header = styled.header`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

const photoSize = '50px'
const photoPadding = '15px'

const Options = styled.ul<{show: boolean}>`
    border: 1px solid ${borderColor};
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
    background: ${backgroundColor};
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
            padding: calc(${photoPadding} / 2) ${photoPadding};
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
        border: 1px solid ${borderColor};
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