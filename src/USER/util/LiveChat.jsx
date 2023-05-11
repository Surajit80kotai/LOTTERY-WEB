import React from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'

const LiveChat = () => {
    const token = JSON.parse(window.localStorage.getItem("token"))

    return (
        <>
            {
                token ?
                    <TawkMessengerReact
                        propertyId="643fa25f4247f20fefec8966"
                        widgetId="1guc94m3j"
                    />
                    : null
            }
        </>
    );
};

export default LiveChat;