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
			<footer className="footer_part">
				<div className="container">
					<div className="row justify-content-around">
						<div className="col-sm-6 col-lg-6">
							<div className="single_footer_part">
								<ul className="list-unstyled">
									<h4>CS CENTER INFO</h4>
									<h5>1111-1111</h5>
									<li>LUNCH 12:00 ~ 13:00</li>
									<li>토, 일, 공휴일은 휴무</li>
									<br></br>
									<li>대표자 최아별 book-mimic@daum.net</li>
									<li>사업자등록번호 : 402-86-03809</li>
									<li>
										통신판매업신고번호 제
										2024-경기구리C-0001
									</li>
									<br></br>
									<li>
										반품 주소 : 경기도 구리시 이이구
										삼삼대로111 사사주
									</li>
									<li>
										<Link href="https://www.ftc.go.kr/bizCommPopView.do">
											가입사실확인
										</Link>
										&nbsp; &nbsp;
										<Link href="https://www.ftc.go.kr/bizCommPopView.do">
											공정거래위원회
										</Link>
										&nbsp; &nbsp; 현금영수증가맹점&nbsp;
										&nbsp;
										<Link href="">개인정보처리방침</Link>
									</li>
								</ul>
								<ul className="footer-add-info"></ul>
							</div>
						</div>
						<div className="col-sm-6 col-lg-3">
							<div className="single_footer_part">
								<h4>ACCOUNT INFO</h4>
								<ul className="list-unstyled">
									<li>농협 111-1111-1111-11</li>
									<li>국민 22222-22222</li>
									<li>우체국 33333-33-333333</li>
									<li>우리 4444-444-444444</li>
									<li>예금주: ㈜북믹</li>
								</ul>
							</div>
						</div>
						<div className="col-sm-6 col-lg-3">
							<div className="single_footer_part">
								<h4>RETURN</h4>
								<ul className="list-unstyled">
									<li>
										<Link href="">교환/반품 정책 확인</Link>
									</li>
									<br />
									<li>
										경기도 구리시 이이구 삼삼대로111 사사주
										우체국 물류센터
									</li>
									<br></br>
									<li>북믹 앞</li>
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
										Copyright &copy;
										<script>
											document.write(new
											Date().getFullYear());
										</script>
										All rights reserved | This template is
										made with
										<i
											className="ti-heart"
											aria-hidden="true"></i>{' '}
										by
										<Link
											href="https://colorlib.com"
											target="_blank">
											Colorlib
										</Link>
									</p>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="footer_icon social_icon">
									<ul className="list-unstyled">
										<li>
											<Link
												href="#"
												className="single_social_icon">
												<i className="fab fa-facebook-f"></i>
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="single_social_icon">
												<i className="fab fa-twitter"></i>
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="single_social_icon">
												<i className="fas fa-globe"></i>
											</Link>
										</li>
										<li>
											<Link
												href="#"
												className="single_social_icon">
												<i className="fab fa-behance"></i>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
			{/* <!--::footer_part end::--> */}

			{/* <footer className="footer_part">
				<div className="tail_wrap">
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
				</div>

				<div className="container">
					<div className="row justify-content-around">
						<div className="col-sm-6 col-lg-4">
							<div className="single_footer_part">
								<ul className="list-unstyled">
									<h4>CS CENTER INFO</h4>
									<h5>1111-1111</h5>
									<li>LUNCH 12:00 ~ 13:00</li>
									<li>주말, 공휴일은 휴무</li>
									<br></br>
									<li>대표자 최아별 book-mimic@daum.net</li>
									<li>사업자등록번호 : 402-86-03809</li>
									<li>통신판매업신고번호 제 2024-경기구리C-0001</li>
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
									
										Copyright &copy;
										<script>document.write(new Date().getFullYear());</script>
										All rights reserved | This template is made with
										<i className="ti-heart" aria-hidden="true"></i> by
										<Link href="https://colorlib.com" target="_blank">
											Colorlib
										</Link>
									
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
    </footer> */}
		</div>
	);
};

export default Footer;
