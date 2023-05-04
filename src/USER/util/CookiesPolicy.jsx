import React from 'react'
import CookieConsent from 'react-cookie-consent'
import { Link } from 'react-router-dom'

const CookiesPolicy = () => {
    return (
        <>
            <CookieConsent
                location="bottom"
                buttonText="I Accept"
                cookieName="ESHAC-PLAY"
                style={{
                    background: "#2B373B",
                    fontSize: "20px",
                    zIndex: "99999999999"
                }}
                buttonStyle={{
                    fontSize: "16px",
                    padding: "10px 25px",
                    backgroundColor: "#8fc1e3",
                    color: "#112d32",
                    borderRadius: "3px",
                    border: "none",
                    transition: "background 0.3s",
                    cursor: "pointer",
                }}
                expires={150}
            >
                This website uses cookies to enhance the user experience.{" "}
                <span style={{ fontSize: "10px" }}>
                    <Link to="/cookiepolicy" style={{ color: "#31708e", fontSize: "18px" }}>Cookies Policy</Link>
                </span>
            </CookieConsent >
        </>
    )
}

export default CookiesPolicy