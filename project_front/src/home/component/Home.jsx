/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
	console.log('11');
	return (
		<div>
			{/*
        - html 주석..
        - html 은 single tag 를 허용하지만.. jsx 는 xml 문법이다. single tag  허용하지 않는다..
        - a => Link
        - class => className
        - style : inline style, jsx - javascript 표현식으로..
        - 이미지 경로 public 의 images 로 변경..
       */}
			{/* <!--::banner_part start::--> */}
			<section className="banner_part">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="single_banner_slider">
								<div className="row">
									{/* <div className="col-lg-5 col-md-8"> */}
									<div className="banner_text">
										<div className="banner_text_iner">
											<img src="img/banner_img0.png" alt="banner0" />
										</div>
									</div>
									{/* </div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- banner_part  end--> */}

			{/* <!-- feature_part1 start--> */}
			<section className="feature_part padding_top">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12">
							<div className="section_tittle text-center">
								<h2>
									New buy
									<br />
								</h2>
								<h5>신규 구매 등록</h5>
							</div>
						</div>
					</div>

					<div className="row align-items-center justify-content-between">
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_1.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_2.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_3.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_4.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- feature_part1 end--> */}

			{/* <!-- feature_part2 start--> */}
			<section className="feature_part padding_top">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12">
							<div className="section_tittle text-center">
								<h2>
									Auction buy <br />
								</h2>
								<h5>경매 물품</h5>
							</div>
						</div>
					</div>
					<div className="row align-items-center justify-content-between">
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_5.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_6.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_7.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5 col-sm-6">
							<div className="single_feature_post_text">
								<Link className="feature_btn" to="/user/signin">
									상품 상세 <i className="fas fa-play"></i>
								</Link>
								<img src="img/feature/feature_8.png" alt="" />
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!--feature_part2 end--> */}
		</div>
	);
};

export default Home;