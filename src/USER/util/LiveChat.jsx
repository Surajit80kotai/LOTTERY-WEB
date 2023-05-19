import React from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

const LiveChat = () => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    return (
        <>
            {
                token ?
                    <TawkMessengerReact
                        propertyId={process.env.REACT_APP_PROPERTY_ID}
                        widgetId={process.env.REACT_APP_WIDGET_ID}
                    />
                    : null
            }
        </>
    );
};

export default LiveChat;