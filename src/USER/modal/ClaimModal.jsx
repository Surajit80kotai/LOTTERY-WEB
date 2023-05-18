import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountry, fetchStates } from '../services/slice/CountryStateSlice'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { claim, clearClaimStatus, userOrderHistory } from '../services/slice/UserSlice'
import { useNavigate } from 'react-router-dom'

const ClaimModal = ({ item }) => {
    const { t } = useTranslation()
    const { countryData, stateData } = useSelector((state) => state.countrystateslice)
    const { claim_data } = useSelector((state) => state.userslice)
    const [formValues, setFormValues] = useState({
        address: "",
        sub_address: "",
        pin_code: "",
        country: "",
        state: "",
        product_id: item?.product_id,
        order_id: item?._id,
        purchase_id: item?.order_id,
        user_id: JSON.parse(window.localStorage.getItem("user"))?.user_id
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // handleChange Function for input change
    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
        const countryId = e.target.value
        if (countryId) {
            getCountryId(countryId)
        }
    }

    // handleSubmit func.
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(claim({ formValues, navigate }))
    }

    // getCountryId
    const getCountryId = (name) => {
        const c_Id = countryData?.filter((item) => {
            if (item.name === (name.split("||")[0])) {
                return item?.countries_id
            }
            return null
        })
        const id = c_Id[0]?.countries_id
        if (id) {
            dispatch(fetchStates(id))
        }
    }

    useEffect(() => {
        dispatch(fetchCountry())
        if (claim_data?.claim_status === "Pending" || claim_data?.claim_status === "Approve") {
            dispatch(userOrderHistory(navigate))
        }
        return () => {
            dispatch(clearClaimStatus())
        }
    }, [dispatch, navigate, claim_data])

    return (
        <>
            {/* Claim Button */}
            <div className="info_item mb-3">
                {
                    item?.claim_status === "" ?
                        <button type="button" className="claimbtn fs-4" data-bs-toggle="modal" data-bs-target="#claim">
                            {t("Claim")}
                            <span className='mx-2'>
                                <i className="fas fa-gift" style={{ "color": "#ffffff" }}></i>
                            </span>
                        </button>
                        :
                        item?.claim_status === "Pending" ?
                            <button type="button" className="claimbtn fs-4" data-bs-toggle="modal" data-bs-target="#claim"
                                style={{
                                    backgroundColor: "#FFAF0A",
                                }} disabled>
                                {t("Applied")}
                                <span className='mx-2'>
                                    <i className="fa-solid fa-box-open" style={{ color: "#ffffff" }}></i>
                                </span>
                            </button>
                            :
                            <button type="button" className="claimbtn fs-4" data-bs-toggle="modal" data-bs-target="#claim"
                                style={{
                                    backgroundColor: "#8dc735",
                                }}
                                disabled>
                                {t("Claimed")}
                                <span className='mx-2'>
                                    <i className="fa-solid fa-award" style={{ color: "#ffffff" }}></i>
                                </span>
                            </button>
                }
            </div>

            {/* Claim Modal Form */}
            <div className="modal fade" id="claim" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content p-3">
                        <div className="modal-header">
                            <h5 className="modal-title fw-bold fs-3" id="exampleModalLabel">{t("Fill Details For Claim Your Prize")}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                {/* Address */}
                                <div className="mb-5">
                                    <label htmlFor="address" className="form-label label_style"> {t("Address")}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="address"
                                        aria-describedby="emailHelp"
                                        placeholder='Enter Your Address'
                                        name='address'
                                        value={formValues?.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Road name/Area/Colony */}
                                <div className="mb-5">
                                    <label htmlFor="rode_name" className="form-label label_style">{t("Road name/Area/Colony")}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="rode_name"
                                        name='sub_address'
                                        placeholder='Enter Your Road name/Area/Colony'
                                        value={formValues?.sub_address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Zipcode/Pincode */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="pincode" className="form-label label_style">{t("Zipcode/Pincode")}</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pincode"
                                                name='pin_code'
                                                placeholder='Enter Your Zipcode/Pincode'
                                                value={formValues?.pin_code}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="col-md-4">
                                        <div className="mb-5">
                                            <label htmlFor="country" className="form-label label_style">{t("Country")}</label>
                                            <select
                                                className="form-select form_select"
                                                aria-label="Default select example"
                                                id='country'
                                                name='country'
                                                value={formValues?.country}
                                                onChange={handleChange}
                                            >
                                                <option value="1">{t("Select")}...</option>
                                                {
                                                    countryData?.map((country) => {
                                                        return (
                                                            <option key={country.countries_id
                                                            } value={country.name + "||" + country.countries_id}>{country.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="state" className="form-label label_style">{t("State")}</label>
                                            <select
                                                className="form-select form_select"
                                                aria-label="Default select example"
                                                id='state'
                                                name='state'
                                                value={formValues?.state}
                                                onChange={handleChange}
                                            >
                                                <option value="1">{t("Select")}...</option>
                                                {
                                                    stateData?.map((state) => {
                                                        return (
                                                            <option key={state?.state_id} value={state?.name + "||" + state.state_id}>{state?.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center m-2">
                                    <button type="submit" className="btn2 btn-primary" data-bs-dismiss="modal">{t("Submit")}</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default ClaimModal