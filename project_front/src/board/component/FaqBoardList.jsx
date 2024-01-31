// 고객센터 부분에서 목록 내용을 표시하는 페이지.
// icon 적용 시키기

import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const FaqBoardList = () => {
	const navigate = useNavigate();

	const [faqBoarList, setFaqBoardList] = useState({
		status: "",
		message: "",
		data: [],
	});

	const getFaqBoardList = useCallback(async () => {
		const resp = await axios.get("http://localhost:8000/boards/faqBoardList", faqBoarList);
		setFaqBoardList(resp.data);
	}, []);

	useEffect(() => {
		getFaqBoardList();
	}, [getFaqBoardList]);

	return (
		<div>
			{/* <h2>test - FnaBoardList page</h2> */}

			<section className="contact-section padding_top">
				<div className="container">
					<div className="row col-12">
						<div className="col-sm-2">
							<h2>고객센터</h2>
						</div>
						<div className="col-sm-10">
							<h2 className="contact-title">FAQ</h2>
						</div>
						<div className="col-lg-2">
							<Link to={"/board/noticelist/"}>
								<p className="text-muted">공지사항</p>
							</Link>
							<Link to={"/board/faqlist"}>
								<p className="text-dark">FAQ</p>
							</Link>
						</div>
						<div className="col-lg-10">
							<div>
								<form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm">
									<div className="row">
										<div className="col-lg-12">
											{/* 드롭박스 */}
											{/* <!-- F.A.Q Group 1 --> */}
											<div>
												<div>
													<h5 className="title">Frequently Asked Questions</h5>

													<div className="accordion bmic-accordion-flush" id="faq-group-1">
														<div className="bmic-accordion-item">
															<h2 className="accordion-header">
																<button className="bmic-accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">
																	B-mic 사이트 판매 등록 방식
																</button>
															</h2>
															<div id="faqsOne-1" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-2" type="button" data-bs-toggle="collapse">
																	B-mic, 상품의 가치 시스템
																</button>
															</h2>
															<div id="faqsOne-2" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-3" type="button" data-bs-toggle="collapse">
																	B-mic, 배송오류 시스템
																</button>
															</h2>
															<div id="faqsOne-3" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-4" type="button" data-bs-toggle="collapse">
																	B-mic, 구매 상품 반품시스템
																</button>
															</h2>
															<div id="faqsOne-4" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">해당 내용은 test 내용입니다.</div>
															</div>

															<div className="accordion-item">
																<h2 className="accordion-header">
																	<button className="accordion-button collapsed" data-bs-target="#faqsOne-5" type="button" data-bs-toggle="collapse">
																		B-mic, 상품 직접 픽업 시스템
																	</button>
																</h2>
																<div id="faqsOne-5" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																	<div className="accordion-body">해당 내용은 test 내용입니다.</div>
																</div>
															</div>

															<div className="accordion-item">
																<h2 className="accordion-header">
																	<button className="accordion-button collapsed" data-bs-target="#faqsOne-6" type="button" data-bs-toggle="collapse">
																		B-mic, 구매 취소 시스템
																	</button>
																</h2>
																<div id="faqsOne-6" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																	<div className="accordion-body">해당 내용은 test 내용입니다.</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* 끝 부분 */}
		</div>
	);
};

export default FaqBoardList;
