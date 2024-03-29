import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { doLogOut } from '../../../services/slice/AuthSlice'
import { emptyCart, getCart } from '../../../services/slice/CartSlice'
import { auth } from '../../../config/firebase'
import { signOut } from 'firebase/auth'
import PreLoader from '../../core/preloader/PreLoader'
import SearchDesk from '../../../util/SearchDesk'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import { fetchCategory } from '../../../services/slice/LotterySlice'
import { getLogo } from '../../../services/slice/SettingsSlice'



const NavBar = () => {
  const { t } = useTranslation()
  const [toggle, setToggle] = useState(true)
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = JSON.parse(window.localStorage.getItem("user"))
  const { cart_data } = useSelector((state) => state.cartslice)
  const cartLength = cart_data?.length
  const { fetch_lott_data, category_data, loading } = useSelector((state) => state.lotteryslice)
  const { site_logo_data } = useSelector((state) => state.settingsSlice)
  const location = useLocation()

  // baseUrl
  const baseUrl = process.env.REACT_APP_NODE_HOST

  // Log Out Function
  const logOut = async () => {
    await signOut(auth)
    dispatch(doLogOut())
    dispatch(emptyCart())
    navigate('/')
  }

  const baseNodeUrl = process.env.REACT_APP_NODE_HOST

  // changeLanguage func.
  const changeLanguage = (e) => {
    const newLanguage = e.target.value;
    i18next.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage);
  }


  useEffect(() => {
    dispatch(getCart(navigate))
    dispatch(fetchCategory())
    dispatch(getLogo())
  }, [dispatch, cartLength, token, navigate])


  // navbar stickey function after language select
  window.onscroll = function () { myFunction() };

  var navbar = document.getElementById("navbar");
  var sticky = navbar?.offsetTop;

  function myFunction() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky")
    } else {
      navbar.classList.remove("sticky");
    }
  }



  return (
    <>
      {/* PreLoader */}
      {loading && <PreLoader />}

      {/* <main> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark p-3" id='navbar'>



        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <div className="companyLogo">
            <img src={baseUrl + site_logo_data?.logo} alt="logo" className="img-fluid" />
          </div>
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">{t('Home')}</Link>
            </li>
            {/* About Us */}
            <li className="nav-item">
              <Link className="nav-link" to="/aboutus">{t('About')} {t('Us')}</Link>
            </li>
            {/* Product Dropdown */}
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{t('Products')}<i className="fa-solid fa-caret-down mx-2"></i></Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {
                  category_data?.map((category) => {
                    return (
                      <li key={category._id} className="px-2">
                        <Link className="dropdown-item text-dark fs-5" to={`/viewall/${category._id}`}>{(category.name).toUpperCase()}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </li>
            {/* How to play */}
            <li className="nav-item">
              <Link className="nav-link" to="/howtoplay">{t('How')} {t('To')} {t('play')}</Link>
            </li>
            {/* Charities */}
            <li className="nav-item">
              <Link className="nav-link" to="/charities">{t('Charities')}</Link>
            </li>
            {/* Contact */}
            {/* <li className="nav-item">
              <Link className="nav-link" to="/contact">{t('Contact')}</Link>
            </li> */}
          </ul>

          <div className="nv_rt">
            {/* Language icon to see the dropdown */}
            <div style={{ display: toggle ? "inline" : "none", marginRight: "10px" }}>
              <Link to="#" onClick={() => setToggle(false)}>
                <i className="fa-solid fa-language" style={{ color: "#ffffff", fontSize: "22px" }}></i>
              </Link>
            </div>

            {/* Language Dropdown */}
            <div style={{ "display": !toggle ? "inline-block" : "none" }}>
              <select onChange={changeLanguage} value={i18next.language} className='langu_select'>
                <option disabled>{t('Language')}</option>
                <option value={"en"}>English</option>
                <option value={"fr"}>French</option>
              </select>
            </div>

            {/* Cross icon to close the dropdown */}
            <div style={{ "display": toggle ? "none" : "inline", marginRight: "10px" }}>
              <Link to="#" onClick={() => setToggle(true)}>
                <i className="fa-solid fa-xmark" style={{ color: "#ff0000", fontSize: "20px" }}></i>
              </Link>
            </div>

            {/* Search Bar */}
            {
              (location.pathname === "/") ?
                <div className="serch_filed">
                  <input
                    type="text"
                    id="searchInput"
                    placeholder={t("Search..")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {
                    search.length > 0 ?
                      <div className="search_result">
                        <SearchDesk ticketList={fetch_lott_data} search={search} setSearch={setSearch} />
                      </div>
                      : null
                  }
                </div>
                : null
            }

            {/* User Dropdown */}
            <div className="area_profile">
              <div className="dropdown">
                {
                  token ?
                    <Link className=" dropdown-toggle userbtn mx-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {
                        user?.profile_img ?
                          <span className="dp">
                            <img className='dp_img' src={baseNodeUrl + user?.profile_img} alt="images" />
                          </span>
                          :
                          <span className="dp">
                            <img className='dp_img' src="./assets/img/user.png" alt="images" />
                          </span>
                      }

                      {token ?
                        user?.full_name ?
                          user?.full_name
                          : user?.displayName
                        : null
                      }
                      <i className="fas fa-user mx-2"></i>
                      <i className="fa-solid fa-caret-down"></i>
                    </Link>
                    : null
                }

                {
                  token ?
                    <ul className="dropdown-menu">
                      <li className="user-menu__item">
                        <Link className="user-menu-link dropdown-item" to="/profile">
                          <div><i className="fas fa-user mx-1"></i><span className='fw-bolder'>{t('My Account')}</span></div>
                        </Link>
                      </li>
                      <li className="user-menu__item">
                        <Link className="user-menu-link dropdown-item" to="/">
                          <button className='logout_btn' onClick={logOut}><i className="fa-solid fa-power-off mx-1"></i><span className='fw-bolder'>{t('Logout')}</span></button>
                        </Link>
                      </li>
                    </ul>
                    : null
                }

              </div>
            </div>

            {/* Cart Icon */}
            {
              token ?
                <div className="cart">
                  <Link to="/cart" className="cartbtn"><i className="fas fa-shopping-cart"></i>
                    {cartLength > 0 ? <span className="label">{cartLength}</span> : null}</Link>
                </div>
                : null
            }

            {/* Login SignUp */}
            {
              !token ?
                <div className="collapse navbar-collapse mx-5" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 login_signup">
                    <li className="nav-item">
                      <Link className="nav-link" to="/verifyphone"><i className="bi bi-person-add mx-2"></i>{t('Sign Up')}</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login"><i className="bi bi-box-arrow-in-right mx-2"></i>{t('Log In')}</Link>
                    </li>
                  </ul>
                </div>
                : null
            }

          </div>

        </div>








      </nav >
      {/* </main> */}
    </>
  )
}

export default NavBar
