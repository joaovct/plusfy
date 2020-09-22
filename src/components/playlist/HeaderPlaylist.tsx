import React from 'react'
import styled from 'styled-components'
import { Page, Container, Title, metrics } from '../../styles/style'
import {ChildComponent} from './types'
import emptyPlaylistPhoto from '../../assets/empty-user-photo.svg'
import { Link } from 'react-router-dom'

const HeaderPlaylist: React.FC<ChildComponent> = ({playlist}) => {
    
    return (
        <Header>
            <Container>
                {
                    playlist ?
                    <HeaderInner>  
                        <img src={playlist.images.length ? playlist.images[0].url : emptyPlaylistPhoto} alt={`Playlist: ${playlist.name}`} />
                        <div>
                            <h4>Playlist</h4>
                            <Title>{playlist.name}</Title>
                            <h6>
                                <Link to={`/user/${playlist.owner.id}`}>{playlist.owner.display_name || `Usuário - ${playlist.owner.id}`}</Link> - 5 hr 39 min
                            </h6>
                        </div>
                    </HeaderInner> : <></>
                }
            </Container>
        </Header>
    )
}

export default HeaderPlaylist

const HeaderInner = styled.header`
    --image-size: 200px;
    height: var(--image-size);
    width: 100%;
    display: flex;

    ${Container}{
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
    }

    img{
        height: var(--image-size);
        width: var(--image-size);
        border-radius: ${metrics.borderRadius};
    }

    div{
        padding: 0 0 0 ${metrics.spacing5};
        height: calc(var(--image-size));
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;

        h4{
            text-transform: uppercase;
            font-weight: 500;
            font-size: 18px;
            letter-spacing: 1.2px;
            margin-top: auto;
        }
        ${Title}{
            line-height: 1.2;
        }
        h6{
            margin-top: auto;
            font-weight: 500;
            font-size: 16px;
            color: #bbb;
            a{
                color: #fff;
                text-decoration: underline;
            }
        }
    }

    @media(max-width: 768px){
        --image-size: 150px;

        div{
            padding: 0 0 0 ${metrics.spacing4};
            
            h4{
                font-size: 16px;
            }
            h6{
                font-size: 14px;
            }
            ${Title}{
                font-size: 30px;
            }
        }
    }

    @media(max-width: 576px){
        --image-size: 200px;
        height: auto;
        flex-flow: column nowrap;
        align-items: center;
        padding: ${metrics.spacing3} 0 0 0;

        img{
            height: auto;
            width: 100%;
            max-width: var(--image-size);
            object-fit: contain;
        }

        div{
            height: auto;
            padding: ${metrics.spacing4} 0 0 0;

            *{
                text-align: center;
            }
            h6{
                margin-top: ${metrics.spacing3};
            }
        }
    }
`

const Header = styled(Page)`
    flex: 0;
    padding-bottom: 0;
`