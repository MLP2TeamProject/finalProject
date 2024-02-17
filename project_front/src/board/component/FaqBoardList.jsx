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
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-1" type="button" data-bs-toggle="collapse">
																	B-mic, 페널티 정책
																</button>
															</h2>
															<div id="faqsOne-1" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">
																	<p>최종 수정일 &nbsp; 2024년 02월 17일</p>
																	<p>&nbsp;</p>
																	<p>판매자와 구매자의 건전한 거래를 위하여 아래 사유에 따라 페널티가 부과됩니다. </p>
																	<p>결제 정보 오류로 패널티 결제 실패 시, 이용약관 제24조("서비스수수료)에 따라 별도의 고지없이 재결제를 시도합니다.</p>
																	<p>&nbsp;</p>
																	<h3><strong>판매거부</strong></h3>
																	<figure className="table">
																		<table className="bmic-table">
																			<tbody>
																				<tr>
																					<td>판매 거래 대기 이후, 1시간 이내 판내 거부</td>
																					<td><h5><b>5.0%</b></h5></td>
																				</tr>
																				<tr>
																					<td>판매 거래 대기 이후, 1시간 이후 판매거부</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																			</tbody>
																		</table>
																	</figure>
																	<p>&nbsp;</p>
																	<p>&nbsp;</p>
																	<h3><strong>발송지연</strong></h3>
																	<figure className="table">
																		<table className="bmic-table">
																			<tbody>
																				<tr>
																					<td>
																						<p>판매 거래 체결 후,&nbsp;</p>
																						<p>48시간(일요일・공휴일 제외) 이내 &nbsp;</p>
																						<p>발송 정보 미입력</p>
																					</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																			</tbody>
																		</table>
																	</figure>
																	<p>&nbsp;</p>
																	<p>&nbsp;</p>
																	<h3><strong>미입고</strong></h3>
																	<figure className="table">
																		<table className="bmic-table">
																			<tbody>
																				<tr>
																					<td>
																						<p>발송 정보 입력 후,&nbsp;</p>
																						<p>5일(일요일・공휴일 제외) 이내&nbsp;</p>
																						<p>검수센터에 미도착</p>
																					</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																				<tr>
																					<td>
																						<p>가송장 등 허위 정보 입력</p>
																					</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																				<tr>
																					<td>
																						<p>거래 체결 전 상품 발송</p>
																					</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																			</tbody>
																		</table>
																	</figure>
																	<p>
																		* 발송 정보 입력 시 지원하지 않는 배송 수단의 경우,
																		운송장 추적 불가, 도착 상품의 식별 곤란 등의 사유로 인해 입고가 불가하며
																		이에 해당하는 상품은 반송 처리됩니다.
																	</p>
																	<p>
																		* 반송 처리 등 정상적이지 않은 배송 방법을 통해 상품을 검수센터로 전달할 경우
																		상품 입고가 불가능합니다.
																	</p>
																	<p>
																		* 단, 부득이한 경우 발송 정보 입력 기한 이내에 고객센터를 통한 협의 및 KREAM의 사전 승인 하에
																		상품 동일성 식별이 가능하도록 조치한 경우에 한하여 상품 입고가 가능한 점 참고 부탁드립니다.
																	</p>
																	<p>&nbsp;</p>
																	<p>&nbsp;</p>

																	<h3><strong>검수기준 악용</strong></h3>
																	<p>아래 검수기준 위반시에는 페널티를 부과합니다. (패키지와 상품 공통 적용)</p>
																	<p>&nbsp;</p>
																	<h4><strong>상품</strong></h4>
																	<figure className="table">
																		<table className="bmic-table">
																			<tbody>
																				<tr>
																					<td>
																						<p>상품 불일치</p>
																					</td>
																					<td><h5><b>10.0%</b></h5></td>
																				</tr>
																			</tbody>
																		</table>
																	</figure>
																	<h4><strong>상품의 심각한 손상/오염/사용감</strong></h4>
																	<p>일반 거래는 판매가 기준이며, 보관 판매는 판매 상품 모든 사이즈의 전월 평균 거래가 기준입니다. </p>
																	<figure className="table">
																		<table className="bmic-table">
																			<tbody>
																				<tr>
																					<td>
																						<p>심한 손상/오염/사용감</p>
																					</td>
																					<td><h5><b>15.0%</b></h5></td>
																				</tr>
																			</tbody>
																		</table>
																	</figure>

																	<h3><strong>패널티 감면 기준</strong></h3>
																	<p>&nbsp;</p>
																	<p>
																		BMIC은 이용약관 제 24조 ("서비스 수수료") 다. 항에 따라 회원이
																		아래와 같은 특별한 사유에 해당하는 것으로 객관적으로 소명할 경우
																		기 부과된 페널티를 감경 또는 면제할 수 있습니다.
																	</p>
																	<p>&nbsp;</p>
																	<p>
																		BMIC은 해당 사안의 사실관계, 이전 사용이력, 거래행태 등을 종합적으로
																		분석하여 아래 사유에 해당하는지 여부를 최종 판단합니다.
																	</p>
																	<p>&nbsp;</p>
																	<p>
																		페널티 감경 또는 면제는 해당 회원의 부주의에도 불구하고 BMIC이 회원의 특별한 사정을
																		고려하여 예외적으로 실시하는 조치이므로 하기 특별 사유의 존재 여부는
																		해당 "회원"이 객관적으로 증명해야 할 책임이 있습니다.
																	</p>
																	<p>&nbsp;</p>
																	<p>
																		- 서비스 사용 미숙에 따른 조작실수임이 명백한 경우
																	</p>
																	<p>
																		- 명백히 택배사의 책임 있는 사유로 인하여 페널티 발생한 경우
																	</p>
																	<p>
																	- 고의성이 없이 가품 및 손상/오염/사용감 있는 제품을 판매한 것이 명백한 경우 
																	(단, 페널티 감경이 이루어지더라도 가품 및 손상/오염/사용감 있는 제품 판매로 인한 
																	이용정지 등의 절차는 진행될 수 있음)
																	</p>
																	<p>&nbsp;</p>

																</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-2" type="button" data-bs-toggle="collapse">
																	B-mic, 부적절행위 금지 
																</button>
															</h2>
															<div id="faqsOne-2" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">
																	<p>최종 수정일 &nbsp; 2024년 02월 17일</p>
																	<p>&nbsp;</p>
																	<p>
																	아래에 해당하는 경우, 이용약관 제 7조(이용제한 등), 21조(부적절 행위)에 따라 
																	일시정지나 영구이용정지 조치됩니다. 허위사실 유포 관련 고의성이 확인될 시, 
																	유관부서로 이관되어 처리될 수 있습니다.
																	</p>
																	<p>&nbsp;</p>
																	<p>- 손상/오염/사용감이 심한 상품 거래 시도</p>
																	<p>- 여러 개의 계정을 생성하여 자전거래</p>
																	<p>- 결제 혜택 및 포인트 획득, 시세 조작 등의 목적으로 지인과 공모한 허위 거래</p>
																	<p>- 신용카드 불법 현금 유통 (소위 카드깡)</p>
																	<p>- 개인 정보를 타인에게 유출하거나 결제 카드를 대여하여 거래(가족, 친지 포함)</p>
																	<p>- 부당한 목적으로 협의하여 계정이나 명의를 도용하여 부정거래(온라인, 오프라인 포함)</p>
																	<p>- 서비스 운영을 방해하는 각종 부정행위</p>
																	<p>&nbsp;</p>
																</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-3" type="button" data-bs-toggle="collapse">
																	B-mic, 이상시세 입찰/거래 취소 정책
																</button>
															</h2>
															<div id="faqsOne-3" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-4" type="button" data-bs-toggle="collapse">
																	B-mic, 배송 사고 보상 프로세스
																</button>
															</h2>
															<div id="faqsOne-4" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-5" type="button" data-bs-toggle="collapse">
																	B-mic, 이용제한 정책
																</button>
															</h2>
															<div id="faqsOne-5" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-6" type="button" data-bs-toggle="collapse">
																	B-mic, 서비스 수수료
																</button>
															</h2>
															<div id="faqsOne-6" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-7" type="button" data-bs-toggle="collapse">
																	B-mic, 서비스 수수료
																</button>
															</h2>
															<div id="faqsOne-7" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-8" type="button" data-bs-toggle="collapse">
																	B-mic, 입찰 마감기한
																</button>
															</h2>
															<div id="faqsOne-8" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-9" type="button" data-bs-toggle="collapse">
																	B-mic, 구매와 판매가 이루어 지는 방식
																</button>
															</h2>
															<div id="faqsOne-9" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
																<div className="bmic-accordion-body">해당 내용은 test 내용입니다.</div>
															</div>
														</div>

														<div className="bmic-accordion-item">
															<h2 className="bmic-accordion-header">
																<button className="h4 bmic-accordion-button collapsed" data-bs-target="#faqsOne-10" type="button" data-bs-toggle="collapse">
																	B-mic, 구매하고 싶은 상품이 없는 경우
																</button>
															</h2>
															<div id="faqsOne-10" className="bmic-accordion-collapse collapse" data-bs-parent="#faq-group-1">
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
