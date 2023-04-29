import React from 'react'
import { useTranslation } from 'react-i18next'

const ErrorPage = () => {
  const { t } = useTranslation()
  return (
    <>
      <div id="error_page_main">
        <div className="fof">
          <h1>{t("Error")} 404</h1>
          <h2>{t("Page Not Found")}</h2>
        </div>
      </div>
    </>
  )
}

export default ErrorPage