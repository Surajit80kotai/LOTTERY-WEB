import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { doLogOut } from '../../../services/slice/AuthSlice'
import { emptyCart, getCart } from '../../../services/slice/CartSlice'
import { auth } from '../../../config/firebase'
import { signOut } from 'firebase/auth'
import PreLoader from '../../core/preloader/PreLoader'
import SearchDesk from '../../../util/SearchDesk'



const NavBar = () => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = JSON.parse(window.localStorage.getItem("token"))
  const user = JSON.parse(window.localStorage.getItem("user"))
  const social_user = JSON.parse(window.localStorage.getItem("social_user"))
  const { cart_data } = useSelector((state) => state.cartslice)
  const cartLength = cart_data?.length
  const { fetch_lott_data, category_data, loading } = useSelector((state) => state.lotteryslice)
  const location = useLocation()

  // console.log(location.pathname);


  // Log Out Function
  const logOut = async () => {
    await signOut(auth)
    window.localStorage.removeItem("user")
    window.localStorage.removeItem("token")
    dispatch(doLogOut())
    dispatch(emptyCart())
    navigate('/')
  }

  useEffect(() => {
    dispatch(getCart())
  },[dispatch, cartLength])



  return (
    <>
      {/* PreLoader */}
      {loading && <PreLoader />}

      {/* <main> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark fixed-top">
        <div className="container-fluid">
          <div className="nv_lf">

            {/* Logo */}
            <Link className="navbar-brand" to="/">
              <div className="companyLogo">
                <img src="/assets/img/logo.png" alt="logo" className="img-fluid" />
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
                  <Link className="nav-link nav-link-active" to="/">Home</Link>
                </li>
                {/* About Us */}
                <li className="nav-item">
                  <Link className="nav-link nav-link-active" to="/aboutus">About Us</Link>
                </li>
                {/* Product Dropdown */}
                <li className="nav-item dropdown">
                  <Link className="nav-link nav-link-active dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Products<i className="fa-solid fa-caret-down mx-2"></i></Link>
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
                  <Link className="nav-link nav-link-active" to="/howtoplay">How To play</Link>
                </li>
                {/* Charities */}
                <li className="nav-item">
                  <Link className="nav-link nav-link-active" to="/charities">Charities</Link>
                </li>
                {/* Contact */}
                <li className="nav-item">
                  <Link className="nav-link nav-link-active" to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

          </div>


          {/* Search Bar */}
          {
            (location.pathname === "/") ?
              <div className='search_bar'>
                <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="form-control search_input me-2 fs-4"
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    // name='search'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn fs-4 "
                    type="submit"
                    style={{ "background": "#f9772b" }}
                  ><i className="fa-solid fa-magnifying-glass d-flex"></i></button>
                </form>
                {
                  search.length > 0 ?
                    <div style={{ "width": "350px", "height": "auto", "backgroundColor": "white" }}>
                      <SearchDesk ticketList={fetch_lott_data} search={search} setSearch={setSearch} />
                    </div>
                    : null
                }
              </div>
              : null
          }


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
                  token ?
                    <Link className=" dropdown-toggle userbtn mx-2" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {token ? user?.full_name : social_user?.displayName}
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
                          <div><i className="fas fa-user mx-1"></i><span className='fw-bolder'>My Account</span></div>
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
                      <Link className="nav-link nav-link-active" to="/verifyphone"><i className="bi bi-person-add mx-2"></i>Sign Up</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link nav-link-active" to="/login"><i className="bi bi-box-arrow-in-right mx-2"></i>Log In</Link>
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
