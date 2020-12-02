import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import {AlertContext, TypeAlert} from '../../../common/providers/AlertProvider'
import { colors, metrics } from '../../../styles/style'

const Alerts = () => {
    const {alerts, removeAlert} = useContext(AlertContext)

    useEffect(() => {
        alerts.forEach((alert, index) => {
            setTimeout(() => removeAlert(index), alert.configs.timing_sec * 1000 + 500)
        })
    //eslint-disable-next-line
    },[alerts])

    return (
        <WrapperAlerts>
            {
                alerts.map((alert, index) => (
                    <Alert key={`alert-${index}-${alert.type}`} type={alert.type} timing={alert.configs.timing_sec} backgroundColor={alert.configs.backgroundColor} >
                        {alert.message}
                    </Alert>
                ))
            }
        </WrapperAlerts>
    )
}

const WrapperAlerts = styled.div`
    display: grid;
    grid-auto-flow: row;
    row-gap: ${metrics.spacing3};
    position: absolute;
    bottom: 100%;
    right: 0;
    padding: 0 ${metrics.spacing4} ${metrics.spacing4} ${metrics.spacing4};
`

const Alert = styled.div<{type: TypeAlert, timing: number, backgroundColor?: string}>`
    padding: 16px 24px;
    min-width: 200px;
    z-index: 4;
    border-radius: 16px;
    box-shadow: 0 6px 16px 8px rgba(0,0,0,.16);
    ${getBackgroundColor};
    ${props => props.backgroundColor ? `background-color: ${props.backgroundColor}` : ''};
    opacity: 0;
    animation: fadeInAlert .5s linear forwards 0s, fadeOutAlert .5s linear forwards ${({timing}) => timing}s;

    @keyframes fadeInAlert{
        from{
            opacity: 0;
        }
        to{
            opacity: 1;
        }
    }

    @keyframes fadeOutAlert{
        from{
            opacity: 1;
        }
        to{
            opacity: 0;
        }
    }

`

function getBackgroundColor(props: {type: TypeAlert}) {
    switch(props.type){
        case 'normal':
            return `background-color: ${colors.secondary}`
        case 'success':
            return `background-color: ${colors.green}`
        case 'warning':
            return `background-color: ${colors.orange}`
        case 'error':
            return `background-color: ${colors.red}`
    }
}

export default Alerts