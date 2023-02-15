import React from 'react'
import Footer from '../../core/footer/Footer'
import Socials from '../../core/footer/Socials'

const FooterMain = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    {/* Footer TO */}
                    <Footer />
                    <hr className="hr" />
                    {/* Socials */}
                    <Socials />
                </div>
            </footer>
        </>
    )
}

export default FooterMain
