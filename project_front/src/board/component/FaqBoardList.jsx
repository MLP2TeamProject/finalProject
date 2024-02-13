// 고객센터 부분에서 목록 내용을 표시하는 페이지.
// icon 적용 시키기

import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FaqBoardList = () => {

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

			<section className="contact-section padding_top bmic-padding">
				<div className="container">
					<div className="row col-12">
						<div className="col-lg-2 bmic-visiable">
							<div>
								<h2>고객센터</h2>
							</div>
							<div>
								<Link to={"/board/noticelist"}>
									<p className="text-dark">공지사항</p>
								</Link>
								<Link to={"/board/faqlist"}>
									<p className="text-muted">FAQ</p>
								</Link>
								<hr />
							</div>
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
													<h2 className="contact-title">FAQ</h2>
													<h5 className="title">-Frequently Asked Questions-</h5>
													<div className="bmic-accordion bmic-accordion-flush" id="faq-group-1">
														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-1" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-2" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-2" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-3" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-3" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-4" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-4" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-5" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-5" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-6" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-6" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-7" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-7" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-8" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-8" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-9" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-9" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-10" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-10" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h3 bmic-accordion-button collapsed" data-bs-target="#faqsOne-11" type="button" data-bs-toggle="collapse">
																	B-mic, faq board test
																</button>
															</h2>
															<div id="faqsOne-11" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
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