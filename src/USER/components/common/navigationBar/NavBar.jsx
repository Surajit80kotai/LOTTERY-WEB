import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { doLogOut } from '../../../services/slice/AuthSlice'
import { emptyCart, getCart } from '../../../services/slice/CartSlice'
import { auth } from '../../../config/firebase'
import { signOut } from 'firebase/auth'

const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = JSON.parse(window.localStorage.getItem("user"))
  const social_user = JSON.parse(window.localStorage.getItem("social_user"))
  const accessToken = JSON.parse(window.localStorage.getItem("accessToken"))
  const { cart_data } = useSelector((state) => state.cartslice)
  const cartLength = cart_data?.length

  const logOut = async () => {
    await signOut(auth)
    window.localStorage.removeItem("social_user")
    window.localStorage.removeItem("accessToken")
    dispatch(doLogOut())
    dispatch(emptyCart())
    navigate('/')
  }

  useEffect(() => {
    dispatch(getCart())
  }, [dispatch, cartLength])

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top">
        <div className="container-fluid">
          <div className="nv_lf">

            {/* Logo */}
            <Link className="navbar-brand" to="/">
              <div className="companyLogo">
                <img src="/assets/img/logo2.png" alt="logo" className="img-fluid" />
              </div>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation Links */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {/* Home */}
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                {/* About Us */}
                <li className="nav-item">
                  <Link className="nav-link" to="/aboutus">About Us</Link>
                </li>
                {/* Product Dropdown */}
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products <i className="bi bi-chevron-down" style={{ "fontSize": "12px" }}></i></Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item text-dark" to="/viewallhome">House & Apartments</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/viewallcars">Cars & Bikes</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/viewallstud_trv">Study & Travle</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/viewallcomp_phn">Computer & Phones</Link></li>
                    <li><Link className="dropdown-item text-dark" to="/viewallcosmetics">Cosmetics</Link></li>
                  </ul>
                </li>
                {/* How to play */}
                <li className="nav-item">
                  <Link className="nav-link" to="/howtoplay">How To play</Link>
                </li>
                {/* Charities */}
                <li className="nav-item">
                  <Link className="nav-link" to="/charities">Charities</Link>
                </li>
                {/* Contact */}
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

          </div>


          <div className="nv_rt">
            {/* Currency Dropdown */}
            {/* {
              token ?
                <div className="courency">
                  <div className="dropdown">
                    <Link className=" dropdown-toggle userbtn mt-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span><img src="/assets/img/currency.png" alt="" className="" /></span> Currency
                    </Link>
                    <ul className="dropdown-menu">
                      <div className="item">
                        <Link to="#!">
                          FCFA
                        </Link>
                      </div>
                      <div className="item">
                        <Link to="#!">
                          XAF
                        </Link>
                      </div>
                      <div className="item">
                        <Link to="#!">
                          XOF
                        </Link>
                      </div>
                      <div className="item">
                        <Link to="#!">
                          USD
                        </Link>
                      </div>
                      <div className="item">
                        <Link to="#!">
                          Euro
                        </Link>
                      </div>
                      <div className="item">
                        <Link to="#!">
                          Naira
                        </Link>
                      </div>
                    </ul>
                  </div>
                </div>
                : null
            } */}

            {/* User Dropdown */}
            <div className="area_profile">
              <div className="dropdown">
                {
                  token || accessToken ?
                    <Link className=" dropdown-toggle userbtn mx-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {token ? user?.full_name : social_user?.displayName}
                      <i className="fas fa-user mx-2"></i>
                    </Link>
                    : null
                }

                {
                  token || accessToken ?
                    <ul className="dropdown-menu">
                      <li className="user-menu__item">
                        <Link className="user-menu-link dropdown-item" to="/profile">
                          <div><i className="fas fa-user mx-1"></i><span className='fw-bolder'>My Profile</span></div>
                        </Link>
                      </li>
                      <li className="user-menu__item">
                        <Link className="user-menu-link dropdown-item" to="/">
                          <div>
                            <button className='text-danger' onClick={logOut}><i className="fa-solid fa-power-off mx-1"></i><span className='fw-bolder'>Logout</span></button>
                          </div>
                        </Link>
                      </li>
                    </ul>
                    : null
                }

              </div>
            </div>

            {/* Cart Icon */}
            {
              token || accessToken ?
                <div className="cart">
                  <Link to="/cart" className="cartbtn"><i className="fas fa-shopping-cart"></i>
                    {cartLength > 0 ? <span className="label">{cartLength}</span> : null}</Link>
                </div>
                : null
            }

            {/* Login SignUp */}
            {
              !token && !accessToken ?
                <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup"><i className="bi bi-person-add mx-2"></i>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login"><i className="bi bi-box-arrow-in-right mx-2"></i>Log In</Link>
                    </li>
                  </ul>
                </div>
                : null
            }

          </div>
        </div>
      </nav >
    </>
  )
}

export default NavBar
