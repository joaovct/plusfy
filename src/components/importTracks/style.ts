import {css} from 'styled-components'

export const breakpoint = '740px'

export const show = css`
    display: flex;
    opacity: 1;
    user-select: initial;
    pointer-events: initial;
    position: relative;
`

export const hide = css`
    display: none;
    opacity: 0;
    user-select: none;
    pointer-events: none;
    position: absolute;
`