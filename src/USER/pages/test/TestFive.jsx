import React from 'react'

const TestFive = () => {
  return (
    <>
      <div class="container-fluid">
        <div class="row ">
          <div class="first_row_title">
            <h2>Cars & Bikes</h2>
          </div>
          <div class="col-md-2">

            <div className="view_all_bg">
              <img src="assets/img/viewmorecard.png" alt="" className="img-fluid" />
              <div className="viewall_btn">
                <h6>Looking More? Click Here</h6>
                <button className="btn2">View All</button>
              </div>
            </div>


          </div>
          {/* <!-- car bike --> */}
          <div class="col-md-10">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="cards-wrapper">

                    <div className="row">
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                </div>

                <div class="carousel-item">
                  <div class="cards-wrapper">
                    <div className="row">
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3 product_item">
                        <div class="product_item_one">
                          <div class="product_img">
                            <div class="pro_img">
                              <img src="assets/img/car1.jpg" alt="" class="img-fluid " />
                            </div>
                            <div class="label_area">
                              <div class="label_tag_img">
                                <img src="assets/img/label.png" alt="" class="img-fluid" />
                              </div>
                              <div class="label_content">
                                <h3 class="currencysymbol">€</h3>
                                <h3 class="price">5,000</h3>
                              </div>
                            </div>
                          </div>
                          <div class="product_content">
                            <div class="product_price">
                              <h3><span>€</span>5,000</h3>
                            </div>
                            <div class="product_title">
                              <h2>Audi </h2>
                            </div>
                            <h3 class="total_ticket">Total Ticket Available : 1456</h3>
                            <div class="game_number">
                              <h4>Game-1</h4>
                            </div>
                            <div class="time_left">
                              <div class="time_left_title">
                                <h3><img src="assets/img/992700 1.png" alt="" />Timeleft</h3>
                              </div>
                              <div id="coundown" class="countdown">
                                <div class="timeleftarea">
                                  <div id="days" class=" days">000
                                  </div>
                                  <br /><span>Days</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="hours" class=" hours">000
                                  </div>
                                  <br /><span>Hours</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="minutes" class=" minutes">000
                                  </div>
                                  <br /><span>Mins</span>
                                </div>
                                <div class="timeleftarea">
                                  <div id="seconds" class=" seconds">000
                                  </div>
                                  <br /><span>Sec</span>
                                </div>
                              </div>
                            </div>
                            <div class="product_action">
                              <a href="" class="btn2">Info</a>
                              <a href="" class="btn2">Buy Ticket</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default TestFive