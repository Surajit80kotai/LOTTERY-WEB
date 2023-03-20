import React from 'react'

const ErrorPage = () => {

  return (
    <>
      <div className="error_msg text-center mt-5">
        <h1 style={{ "fontSize": "35px", "fontFamily": "sans-serif" }}>Network Error !!!</h1>
        <p style={{ "fontSize": "25px", "fontFamily": "sans-serif" }}>We are sorry, but the page you requested was not found</p>
      </div>
    </>
  )
}

export default ErrorPage