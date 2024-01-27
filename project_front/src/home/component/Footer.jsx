/* eslint-disable */

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div>
			{/*

        html vs JSX 차이점 헤결..
        - html 주석 제거..
        - a 태그를 Link로 교체..
        - className -> classNameName..편집->바꾸기 메뉴를 이용해서
      */}
			{/* <!--::footer_part start::--> */}
			<footer className="footer">
				<div className="tail_wrap">
					<div className="tail_head">
						<div className="wrapper">
							<ul className="tail_shop_info">
								<li>
									<Link href="">회사소개</Link>
								</li>
								<li>
									<Link href="">이용약관</Link>
								</li>
								<li>
									<Link href="">개인정보처리방침</Link>
								</li>
								<li>
									<Link href="">이용안내</Link>
								</li>
							</ul>
							<div className="bsns_wrap">
								<ul className="sns">
									<li>
										<Link href="#" className="single_social_icon">
											<i className="fab fa-facebook-f"></i>
										</Link>
									</li>
									<li>
										<Link href="#" className="single_social_icon">
											<i className="fab fa-twitter"></i>
										</Link>
									</li>
									<li>
										<Link href="#" className="single_social_icon">
											<i className="fas fa-globe"></i>
										</Link>
									</li>
									<li>
										<Link href="#" className="single_social_icon">
											<i className="fab fa-behance"></i>
										</Link>
									</li>
								</ul>
							</div>{' '}
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row justify-content-around">
						<div className="col-sm-6 col-lg-2">
							<div className="single_footer_part">
								<ul className="list-unstyled">
									<img src="img/logo01.png" alt="logo" />
									<li>
										<Link>상호명:(주)북믹| 대표: 최아별</Link>
									</li>
									<li>
										<Link>
											주소 : 11111 경기도 구리시 일일길 11 (일일동1가) 북믹
										</Link>
									</li>
									<li>
										<Link>
											통신판매업: 제 2024-경기구리C-0001 | 사업자등록번호 :
											402-86-03809 [사업자정보확인]
										</Link>
									</li>
									<li>
										<Link href="">
											개인정보관리책임자 : 최별 | 제휴/협력문의 : Book-
											Mimi@daum.net
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6 col-lg-2">
							<div className="single_footer_part">
								<h4>CS CENTER</h4>
								<ul className="list-unstyled">
									<li>
										<Link href="">1111-1111</Link>
									</li>
									<li>
										<Link href="">WEEK 10:00 ~ 17:00</Link>
									</li>
									<li>
										<Link href="">LUNCH 12:00 ~ 13:00</Link>
									</li>
									<br />
									<li>
										<Link href="">주말, 공휴일은 휴무입니다.</Link>
									</li>
									<li>
										<Link href="">통화량 폭주로 전화연결이 안 될 경우,</Link>
									</li>
									<li>
										<Link href="">
											게시판에 문의 남겨주시면 빠른 처리 해드리겠습니다.
										</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6 col-lg-2">
							<div className="single_footer_part">
								<h4>ACCOUNT INFO</h4>
								<ul className="list-unstyled">
									<li>
										<Link href="">농협 111-1111-1111-11</Link>
									</li>
									<li>
										<Link href="">국민 22222-22222</Link>
									</li>
									<li>
										<Link href="">우체국 33333-33-333333</Link>
									</li>
									<li>
										<Link href="">우리 4444-444-444444</Link>
									</li>
									<li>
										<Link href="">예금주: ㈜북믹</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6 col-lg-2">
							<div className="single_footer_part">
								<h4>RETURN</h4>
								<ul className="list-unstyled">
									<li>
										<Link href="">교환/반품 정책 확인</Link>
									</li>
									<br />
									<li>
										<Link href="">경기도 구리시 이이구 삼삼대로111</Link>
									</li>
									<li>
										<Link href="">사사주 우체국 물류센터</Link>
									</li>
									<li>
										<Link href="">북믹 앞</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="copyright_part">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<div className="copyright_text">
									<p>
										{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
										Copyright &copy;
										<script>document.write(new Date().getFullYear());</script>
										All rights reserved | This template is made with
										<i className="ti-heart" aria-hidden="true"></i> by
										<Link href="https://colorlib.com" target="_blank">
											Colorlib
										</Link>
										{/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			;{/* <!--::footer_part end::-->  */}
		</div>
	);
};

export default Footer;
