import { Page, PrivateRouteComponent, breakpoints, colors } from '../../styles/style'
import { HeaderStyled } from '../utils/privateRoute/Header'
import { StickyElements } from '../utils/privateRoute/PrivateRoute'

export function generateCSS(images: string[]): string{
    const keyframesBackground = getBackgroundKeyframes(images)
    
    return `
        @media(max-width: ${breakpoints.tbp}){
            ${PrivateRouteComponent}{
                ${StickyElements}{
                    &:not(:nth-last-child(2)){
                        z-index: 3;
                    }
                }
                ${HeaderStyled}{
                    &, *{
                        z-index: 2;
                    }
                }
                ${Page}{
                    &, *{
                        z-index: 1;
                    }
                }
            }

            ${PrivateRouteComponent}{
                &:before{
                    content: '';
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100vh;
                    width: 100vw;
                    pointer-events: none;
                    user-select: none;
                    background: ${colors.darkerBackground};
                    transition: background .5s;
                }
            }

            ${keyframesBackground}
        }
    `
}

function getBackgroundKeyframes(images: string[]): string{
    function calculatePercentage(n: number){
        return Math.floor(100 / (images.length + 1) * n)
    }
    return `
        ${PrivateRouteComponent}{
            background-image: url(${images[0]});
            background-position: 50% 50%;
            background-repeat: no-repeat;
            background-size: cover;
            animation: ${10 * images.length}s background infinite;
            animation-iteration-count: infnite;
            transition: background-image 0.5s ease-in-out;
            
            &:before{
                background: ${colors.darkerBackgroundTranslucent};
            }

            @keyframes background{
                ${images.map((image, index) => {
                    const percentage = calculatePercentage(index)

                    return`
                        ${percentage}%{
                            background-image: url(${image});
                        }
                    `
                }).join('')}
            }
        }
    `
}