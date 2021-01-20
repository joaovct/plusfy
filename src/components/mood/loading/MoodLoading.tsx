import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import loadingAnimation from '../../../assets/mood/loading-animation.webm'
import { Title, Text, breakpoints } from '../../../styles/style'

const MoodLoading = () => {
    const animationRef = useRef<HTMLVideoElement>(null)
    const isMounted = useRef(true)
    
    useEffect(() => {
        return () => {isMounted.current = false}
    },[])

    useEffect(() => {
        if(animationRef.current){
            setInterval(() => {
                if(isMounted.current){
                    animationRef.current?.play()
                }
            }, 2500)
        }
    },[animationRef])

    return(
        <Loading>
            <Animation ref={animationRef} autoPlay>
                <source src={loadingAnimation} type="video/webm"/>
            </Animation>
            <Title>Um momento...</Title>
            <Text>Estamos analisando suas músicas</Text>
        </Loading>
    )
}

const Animation = styled.video`
    --size: 175px;
    height: var(--size);
    width: var(--size);
    filter: brightness(.95);
    user-select: none;
`

const Loading = styled.div`
    height: 100%;
    width: 100%;
    flex: 1 0 0;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    ${Title}{
        margin: 32px 0 0 0;
    }

    ${Text}{
        margin: 10px 0 0 0;
        
        @media(max-width: ${breakpoints.smp}){
            font-size: 16px;
        }
        @media(max-width: calc(${breakpoints.smp} + 20px)){
            font-size: 14px;
        }
    }

    ${Title}, ${Text}{
        text-align: center;
    }
`

export default MoodLoading