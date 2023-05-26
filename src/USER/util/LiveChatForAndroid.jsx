import React, { useEffect } from 'react'
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'
import { getLogo } from '../services/slice/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'

const LiveChatForAndroid = () => {
    const { site_logo_data } = useSelector((state) => state.settingsSlice)
    // baseUrl
    const baseUrl = process.env.REACT_APP_NODE_HOST
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLogo())
    }, [dispatch])

    return (
        <>
            <div className="container text-center bg-light pt-5 " style={{ height: "100vh" }}>
                <div style={{ paddingTop: "50%" }}>
                    <img src={baseUrl + site_logo_data?.logo} alt="logo" className="img-fluid" />
                    <h6 className='text-dark mt-5 fw-bold fs-1'>Click Below Icon For Live chat</h6>
                    <h5 style={{ fontSize: "40px", marginTop: "40px" }}><i className="far fa-hand-point-down"></i></h5>
                </div>

            </div>
            <TawkMessengerReact
                propertyId={process.env.REACT_APP_PROPERTY_ID}
                widgetId={process.env.REACT_APP_WIDGET_ID}
            />
        </>
    )
}

export default LiveChatForAndroid