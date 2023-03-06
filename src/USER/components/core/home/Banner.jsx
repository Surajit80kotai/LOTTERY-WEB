import React from 'react'
import { useSelector } from 'react-redux';
import "slick-carousel/slick/slick.css";
import BannerData from '../../common/banner/BannerData';

const Banner = () => {
    const { fetch_lott_data } = useSelector((state) => state.lotteryslice)
    const bannerData = fetch_lott_data?.map(item => {
        return item?.is_banner === true ? item : null
    })

    // console.log(bannerData);

    return (
        <>
            <div id="carouselExampleControls" className="carousel slide mar_top" data-bs-ride="carousel">
                <div className="carousel-inner">
                    {
                        bannerData?.length ?
                            bannerData?.map((item, index) => {
                                let act = ""
                                if (index === 0) {
                                    act = "active";
                                }
                                return (
                                    <div className={`carousel-item ${act}`} key={index}>
                                        <BannerData item={item} id={item?._id} />
                                    </div>
                                )
                            })
                            : null
                    }

                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Banner