import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints, colors } from '../../../styles/style'

interface Props{
    pathname: string,
    text: string,
    icon: JSX.Element
}

const TabBarItem: React.FC<Props> = ({pathname, text, icon: Icon}) => {
    const location = useLocation()
    const [active, setActive] = useState(false)

    useEffect(() => {
        if(location.pathname.indexOf(pathname) > -1){
            return setActive(true)
        }
        return setActive(false)
    },[location, pathname])

    return(
        <TabBarItemStyled active={active}>
            <Link to={pathname}>
                {Icon}
                <span>{text}</span>
            </Link>
        </TabBarItemStyled>
    )
}

export default TabBarItem

const TabBarItemStyled = styled.figure<{active: boolean}>`
    width: 100%;
    max-width: 200px;
    display: flex;
    justify-content: center;
    padding: 0 5px;
    border-radius: 5px;
    transition: .15s background; 

    @media(max-width: ${breakpoints.sml}){
        max-width: 125px;
    }

    @media(max-width: 400px){
        max-width: 100px;
    }

    a{
        width: 100%;
        --iconSize: 32px;
        display: flex;
        align-items: center;
        flex-flow: column nowrap;

        @media(max-width: ${breakpoints.sml}){
            --iconSize: 30px;
        }

        @media(max-width: ${breakpoints.smp}){
            --iconSize: 24px;
        }

        svg, span{
            transition: .15s fill, .15s color;
        }

        svg{
            height: var(--iconSize);
            width: var(--iconSize);
            fill: ${colors.gray};

            *{
                stroke: inherit;
            }
        }

        span{
            margin: 2.5px 0 0 0;
            font-size: 12px;
            color: ${colors.gray};
        }

        ${({active}) => {
                if(active)
                    return `
                        svg{
                            fill: #fff;
                        }
                        span{
                            color: #fff;
                        }
                    `
            }}
    }
`