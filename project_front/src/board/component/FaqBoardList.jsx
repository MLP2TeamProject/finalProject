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
							<Link to={"/board/noticelist/1"}>
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
											<div >
												<div >
													<h5 className="title">Frequently Asked Questions</h5>

													<div className="accordion accordion-flush" id="faq-group-1">
														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">
																	Debitis adipisci eius?
																</button>
															</h2>
															<div id="faqsOne-1" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">
																	Ut quasi odit odio totam accusamus vero eius. Nostrum asperiores voluptatem eos nulla ab dolores est asperiores iure. Quo est quis praesentium aut maiores. Corrupti sed aut expedita fugit vero dolorem. Nemo rerum sapiente. A quaerat
																	dignissimos.
																</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-2" type="button" data-bs-toggle="collapse">
																	Omnis fugiat quis repellendus?
																</button>
															</h2>
															<div id="faqsOne-2" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">
																	In minus quia impedit est quas deserunt deserunt et. Nulla non quo dolores minima fugiat aut saepe aut inventore. Qui nesciunt odio officia beatae iusto sed voluptatem possimus quas. Officia vitae sit voluptatem nostrum a.
																</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-3" type="button" data-bs-toggle="collapse">
																	Et occaecati praesentium aliquam modi incidunt?
																</button>
															</h2>
															<div id="faqsOne-3" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">
																	Voluptates magni amet enim perspiciatis atque excepturi itaque est. Sit beatae animi incidunt eum repellat sequi ea saepe inventore. Id et vel et et. Nesciunt itaque corrupti quia ducimus. Consequatur maiores voluptatum fuga quod ut
																	non fuga.
																</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-4" type="button" data-bs-toggle="collapse">
																	Quo unde eaque vero dolor quis ipsam?
																</button>
															</h2>
															<div id="faqsOne-4" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">Numquam ut reiciendis aliquid. Quia veritatis quasi ipsam sed quo ut eligendi et non. Doloremque sed voluptatem at in voluptas aliquid dolorum.</div>
															</div>
														</div>

														<div className="accordion-item">
															<h2 className="accordion-header">
																<button className="accordion-button collapsed" data-bs-target="#faqsOne-5" type="button" data-bs-toggle="collapse">
																	Natus sunt quo atque mollitia accusamus?
																</button>
															</h2>
															<div id="faqsOne-5" className="accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="accordion-body">
																	Aut necessitatibus maxime quis dolor et. Nihil laboriosam molestiae qui molestias placeat corrupti non quo accusamus. Nemo qui quis harum enim sed. Aliquam molestias pariatur delectus voluptas quidem qui rerum id quisquam.
																	Perspiciatis voluptatem voluptatem eos. Vel aut minus labore at rerum eos.
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
