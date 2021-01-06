import React from 'react'
import { Volume, Volume1, Volume2, VolumeX } from "react-feather";
import { GetVolumeIcon } from "../../components/common/nowPlaying/types"
import { ICurrentState } from "../../redux/store/currentState/types";
import { colors } from "../../styles/style";

export const handleRepeatState = (state: ICurrentState['repeat_state']) => {
    if(state === 'context')
        return `
            svg{
                stroke: ${colors.primary};
                opacity: var(--iconOpacityActivate);
            }
        `
    else if(state === 'track')
        return `
            position: relative;
            svg{
                stroke: ${colors.primary};
                opacity: var(--iconOpacityActivate);
            }
            &:before{
                content: '1';
                font-size: 6px;
                line-height: 11px;
                height: 11px;
                width: 11px;
                padding-left: 1px;
                padding-top: 3px;
                box-sizing: border-box;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                top: -1px;
                right: -2px;
                z-index: 2;
                background: ${colors.primary};
            }
        `
    return ''
}

export const getVolumeIcon: GetVolumeIcon = (volume) => {
    if(volume === 0)
        return <VolumeX/>
    else if(volume <= 25)
        return <Volume/>
    else if(volume <= 50)
        return <Volume1/>
    return <Volume2/>
}