import styled from 'styled-components'
import { metrics, Dropdown as dropdown, InputRange, colors } from "../../../styles/style";

export const RangeBar = styled.div<{volume: number}>`
    height: ${({volume}) => `calc( var(--heightInput) * ${volume / 100} + var(--additionThumbSize))`};
    max-height: var(--heightInput);
    width: var(--widthInput);
    position: absolute;
    bottom: calc(var(--spacingHeight) / 2);
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto; 
    border-radius: ${metrics.borderRadius};
    background: ${colors.gray};
    transition: .25s background;

    &:before{
        content: '';
        display: block;
        height: var(--heightInput);
        width: var(--widthInput);
        background: ${colors.darkerGray};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto; 
        border-radius: ${metrics.borderRadius};
        z-index: -1;
    }
`

export const VolumeControl = styled.span`
    display: inline-block;
    --widthInput: 15px;
    --heightInput: 130px;
    --spacingWidth: 30px;
    --spacingHeight: 30px;
    --additionThumbSize: 5px;
    --sizeThumb: calc( var(--widthInput) + var(--additionThumbSize) );
    height: calc( var(--heightInput) + var(--spacingHeight));
    width: calc( var(--widthInput) + var(--spacingWidth));
    position: relative;

    ${InputRange}{
        height: var(--widthInput);
        width: var(--heightInput);
        margin: calc( var(--heightInput) / 3 ) 0 0 0;
        --translateY: calc( var(--heightInput) / -2 + var(--widthInput) / 2 + var(--spacingWidth) / 2);
        --translateX: calc(var(--spacingHeight) / -2 + var(--additionThumbSize) / -2);
        transform: rotate(-90deg) translateY(var(--translateY)) translateX(var(--translateX));
        position: relative;
        z-index: var(--zIndexOverlay);

        &::-webkit-slider-thumb{
            appearance: none;
            height: var(--sizeThumb);
            width: var(--sizeThumb);
            margin-top: calc( var(--additionThumbSize) / -2 );
            border-radius: 100%;
            background: #fff;
        }

        &::-webkit-slider-runnable-track{
            width: 100%;
            height: 100%;
            cursor: pointer;
            background: transparent;
            border-radius: ${metrics.borderRadius};
            transition: .25s background;
        }

        &::-ms-track{
            width: 100%;
            cursor: pointer;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        &:focus{
            outline: 0;
        }

        &:not(:disabled):hover{
            & + ${RangeBar}{
                background: ${colors.primary};
            }
        }
    }
`

export const NowPlayingDropdown = styled(dropdown)`
    top: inherit;
    left: inherit;
    right: inherit;
    bottom: calc(100% + ${metrics.spacing2});
    min-width: inherit;
    overflow: hidden;

    ${VolumeControl}{
        padding-left: 0;
        padding-right: 0;
    }
`

export const cssVariables = `
    --innerPaddingVertical: ${metrics.spacing3};
    --innerPaddingHorizontal: ${metrics.spacing4};
    --innerPadding: var(--innerPaddingVertical) var(--innerPaddingHorizontal);
    --iconOpacityDisabled: .4;
    --iconOpacity: .7;
    --iconOpacityActivate: 1;
    --iconOpacityTransition: .15s;
`