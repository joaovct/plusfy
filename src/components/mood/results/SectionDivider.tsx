import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFormattedThumbnails } from '../../../common/helpers/helperMood'
import useMoodContext from '../../../common/hooks/components/mood/useMoodContext'
import { breakpoints } from '../../../styles/style'

const SectionDivider = () => {
    const {results} = useMoodContext()
    const [thumbnails, setThumbnails] = useState<string[]>([])

    useEffect(() => {
        if(results){
            const thumbnails = getFormattedThumbnails([...results.dancing, ...results.energetic, ...results.happy, ...results.mellow, ...results.relaxing], 18)
            setThumbnails(thumbnails)
        }
    },[results])

    const renderThumbnails = () => (
        thumbnails.map(item => (
            <Thumbnail key={item}>
                <figure>
                    <img src={item} alt="thumbnail"/>
                </figure>
            </Thumbnail>
        ))
    )

    return(
        <SectionDividerStyled>
            <InnerDivider nThumbnails={thumbnails.length}>
                {
                    renderThumbnails()
                }
                {
                    renderThumbnails()
                }
            </InnerDivider>
        </SectionDividerStyled>
    )
}

const Thumbnail = styled.div`
    min-height: var(--sizeThumbnail);
    max-height: var(--sizeThumbnail);
    min-width: var(--widthThumbnail);
    max-width: var(--widthThumbnail);

    figure{
        height: var(--sizeThumbnail);
        width: var(--sizeThumbnail);
        margin: 0 auto;

        img{
            height: 100%;
            width: 100%;
        }
    }
`

const InnerDivider = styled.div<{nThumbnails: number}>`
    --widthThumbnail: calc(var(--sizeThumbnail) + var(--thumbnailGap));
    height: var(--sizeThumbnail);
    width: calc((var(--widthThumbnail)) * ${({nThumbnails}) => nThumbnails * 2});
    left: 0;
    overflow-x: scroll;
    display: flex;
    flex-flow: row nowrap;
    position: absolute;
    animation: scroll ${({nThumbnails}) => nThumbnails * 2}s linear infinite;

    @keyframes scroll {
	    0% {
            transform: translateX(0);
        }
	    100% {
            transform: translateX(calc((var(--widthThumbnail)) * ${({nThumbnails}) => nThumbnails * -1}))
        }
    }   

    &::-webkit-scrollbar{
        display: none;
    }
`

const SectionDividerStyled = styled.div`
    margin: 80px 0;
    --sizeThumbnail: 150px;
    --thumbnailGap: 40px;
    height: var(--sizeThumbnail);
    width: 100%;
    overflow-x: hidden;

    @media(max-width: ${breakpoints.tbp}){
        --sizeThumbnail: 125px;
        margin: 60px 0;
    }

    @media(max-width: ${breakpoints.sml}){
        --sizeThumbnail: 100px;
        --thumbnailGap: 20px;
        margin: 40px 0;
    }
`

export default SectionDivider