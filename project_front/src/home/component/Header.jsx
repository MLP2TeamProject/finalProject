/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	console.log('33');
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
			{/* <!--::header part start::--> */}
			<header className="main_menu home_menu">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<nav className="navbar navbar-expand-lg navbar-light">
								<Link className="navbar-brand" to="/">
									<img src="img/logo01.png" alt="logo" />
								</Link>
								<div
									className="collapse navbar-collapse main-menu-item"
									id="navbarSupportedContent">
									<ul className="navbar-nav">
										<li className="nav-item">
											<Link className="nav-link" to="/user/signin">
												상품
											</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" to="/user/signin">
												구매신청
											</Link>
										</li>
										<li className="nav-item">
											<Link className="nav-link" id="search_1">
												<i className="ti-search"></i>
											</Link>
										</li>
									</ul>
								</div>
								<div className="dddd d-flex">
									<Link id="nav123" to="/user/signin">
										고객센터
									</Link>
									<Link id="nav123" to="/user/signin">
										마이페이지
									</Link>
									<Link id="nav123" to="/user/signin">
										로그인
									</Link>
								</div>
							</nav>
						</div>
					</div>
				</div>
				<div className="search_input" id="search_input_box">
					<div className="container">
						<form className="d-flex justify-content-between search-inner">
							<input
								type="text"
								className="form-control"
								id="search_input"
								placeholder=""
							/>
							<button type="submit" className="btn"></button>
							<span
								className="ti-close"
								id="close_search"
								title="Close Search"></span>
						</form>
					</div>
				</div>
			</header>
			{/* <!-- Header part end--> */}
			<section className="banner_part">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="banner_slider owl-carousel">
								{/* <div className="banner_slider owl-carousel owl-loaded owl-drag"> */}
								<div className="single_banner_slider">
									<div className="row">
										<div className="col-lg-5 col-md-8">
											<div className="banner_text">
												<div className="banner_text_iner">
													<img src="img/b-mic.png" alt="banner0" />
												</div>
											</div>
										</div>
										<div className="banner_img d-none d-lg-block">
											<img src="img/banner_img1.png" alt="banner1" />
										</div>
									</div>
								</div>
								<div className="single_banner_slider">
									<div className="row">
										<div className="col-lg-5 col-md-8">
											<div className="banner_text">
												<div className="banner_text_iner">
													<h1>네이버페이 </h1>
													<p>네이버페이 결제 시 1만포인트 적립</p>
													<h6>1/18(목)부터 10만원 이상 결제 시</h6>
												</div>
											</div>
										</div>
										<div className="banner_img d-none d-lg-block">
											<img src="img/banner_img2.png" alt="banner2" />
										</div>
									</div>
								</div>
								<div className="single_banner_slider">
									<div className="row">
										<div className="col-lg-5 col-md-8">
											<div className="banner_text">
												<div className="banner_text_iner">
													<h1>역경매 전용</h1>
													<p>5% 할인쿠폰</p>
													<Link href="category.html" className="btn_2">
														buy now
													</Link>
												</div>
											</div>
										</div>
										<div className="banner_img d-none d-lg-block">
											<img src="img/banner_img3.png" alt="banner3" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Header;
