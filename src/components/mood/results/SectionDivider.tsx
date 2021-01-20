import React from 'react'
import styled from 'styled-components'

const SectionDivider = () => {
    const thumbnails = [
        "https://i.scdn.co/image/ab67616d0000b273b6567be9f8b996a2b5f9b7fa",
        "https://i.scdn.co/image/ab67616d0000b273670f171832a0e3c834ee3895",
        "https://i.scdn.co/image/ab67616d0000b273c9103bcebb6bf4ca93c7ad3d",
        "https://i.scdn.co/image/ab67616d0000b27398aea4df8e6f328d0e25666c",
        "https://i.scdn.co/image/ab67616d0000b273ce89e28d6505ffc574dc9417",
        "https://i.scdn.co/image/ab67616d0000b273d3e175f246db232064293c7d",
        "https://i.scdn.co/image/ab67616d0000b2732b79437b4d0aa1145add6bb0",
        "https://i.scdn.co/image/ab67616d0000b273768d57b555e39929fea69b02",
        "https://i.scdn.co/image/ab67616d0000b273f837b364ac37809bdb656d3b",
        "https://i.scdn.co/image/ab67616d0000b273330ee208e4938ba122a9675a",
        "https://i.scdn.co/image/ab67616d0000b273f41af553cddb6c2f424c77dc",
        "https://i.scdn.co/image/ab67616d0000b273de03bfc2991fd5bcfde65ba3",
        "https://i.scdn.co/image/ab67616d0000b27364075ce6abb765fb8ac8d391",
        "https://i.scdn.co/image/ab67616d0000b2731813ea8f590a0aab2820f922",
        "https://i.scdn.co/image/ab67616d0000b2730507c0a364f274bd5c86fa78",
        "https://i.scdn.co/image/ab67616d0000b27322c614bdaf27ea223bcb2add",
        "https://i.scdn.co/image/ab67616d0000b2736e7cb1429534f0d21133b714"
    ]

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
    --widthThumbnail: calc(var(--sizeThumbnail) + 40px);
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
    height: var(--sizeThumbnail);
    width: 100%;
    overflow-x: hidden;
`

export default SectionDivider