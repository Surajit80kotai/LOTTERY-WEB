import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const Socials = () => {
  const { t } = useTranslation()
  return (
    <>
      <div className="footer_bottom">
        {/* <ul className="social mt-5">
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (1).png" alt="" /></Link></li>
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (2).png" alt="" /></Link></li>
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (3).png" alt="" /></Link></li>
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (4).png" alt="" /></Link></li>
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (5).png" alt="" /></Link></li>
          <li><Link to="#" className="soci_btn"><img src="/assets/img/social (6).png" alt="" /></Link></li>
        </ul> */}
        <div className="copywriter">
          <h6>
            {t("Copyright")} © 2022
            <span><Link to="#" className="copy"> {t("ES-Play Corporation")}</Link> || {t("Version")} 1.0.1</span> </h6>
        </div>
      </div>
    </>
  )
}

export default Socials
