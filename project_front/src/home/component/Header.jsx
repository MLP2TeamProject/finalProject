/* eslint-disable */

<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React from 'react';
>>>>>>> 19e2b7e (중간점검)
=======
import React, { useState } from 'react';
>>>>>>> 8913c86 (1/31점검)
import { Link } from 'react-router-dom';

const Header = () => {
	console.log('33');
<<<<<<< HEAD
<<<<<<< HEAD

	const [isShowSearch, setShowSearch] = useState(false);

=======
>>>>>>> 19e2b7e (중간점검)
=======

	const [isShowSearch, setShowSearch] = useState(false);

>>>>>>> 8913c86 (1/31점검)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8913c86 (1/31점검)
										<li
											className="nav-item"
											onClick={(e) => {
												e.preventDefault();
												setShowSearch(true);
											}}>
<<<<<<< HEAD
=======
										<li className="nav-item">
>>>>>>> 19e2b7e (중간점검)
=======
>>>>>>> 8913c86 (1/31점검)
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
<<<<<<< HEAD
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
								title="Close Search"
								onClick={(e) => {
									e.preventDefault();
									setShowSearch(false);
								}}></span>
						</form>
=======
				{isShowSearch ? (
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
									title="Close Search"
									onClick={(e) => {
										e.preventDefault();
										setShowSearch(false);
									}}></span>
							</form>
						</div>
>>>>>>> 8913c86 (1/31점검)
					</div>
				) : (
					''
				)}
			</header>
			{/* <!-- Header part end--> */}
<<<<<<< HEAD
=======
			{/* <!--::banner_part start::--> */}
			<section className="banner_part">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
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
						</div>
					</div>
				</div>
			</section>
			{/* <!-- banner_part  end--> */}
>>>>>>> 8913c86 (1/31점검)
		</div>
	);
};

export default Header;
