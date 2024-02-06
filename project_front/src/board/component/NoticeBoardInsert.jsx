// 공지 페이지 글을 등록하는? 필요한지 추우 조금 더 고민.

import axios from "axios";
import { useCallback, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../../UserContext"

const NoticeBoardInsert = () => {
	const navigate = useNavigate()

	const context = useContext(UserContext)
	const userEmail = context.state.userData.email
	console.log(userEmail)

	// 유효입력데이터
	const [noticeData, setNoticeData] = useState({ id: '', title: '', content: '', email: userEmail });

	const changeNoticeData = useCallback((e) => {
		setNoticeData((noticeData) => ({ ...noticeData, [e.target.name]: e.target.value }))
	}, [noticeData])

	// 등록버튼 클릭시에. 
	const noticeInsert = useCallback(async (e) => {
		e.preventDefault()
		// post 방식은 url 요청 후 data를 전송해야한다. ***
		const resp = await axios.post('http://localhost:8000/boards/noticeinsert', noticeData)
		if (resp.data.status === 500) window.alert(resp.data.message)
		else {
			// 화면 자동 목록으로 
			navigate('/board/noticelist')
		}
	}, [noticeData, navigate])

	return (
		<div>
			{/* Notice Insert Page (고객센터 - 공지 - 글쓰기) */}
			{/* <h2>test - NoticeBoardInsert page</h2> */}

			<section className="contact-section padding_top">
				<div className="container">
					<div className="row col-12">
						<div className="col-lg-2">
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

						{/* 게시판내용 */}
						<div className="col-lg-10">
							<div>
								<h2 className="contact-title">공지사항</h2>
								<form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm">
									<div className="row">
										<div className="col-lg-12">
											<table className="table table">
												<tbody className="col-12">
													<tr className="col-sm-12">
														<td className="col-sm-2">제목</td>
														<td>
															{/* 색이 정해지면 style.css 에서 .single-textarea 의 설정 바꾸면 선 색이 바뀜 임시 연보라*/}
															<textarea cols="100" rows="1" name="title" className="bmic-textarea"
																placeholder="제목을 입력해주세요." value={noticeData.title} onChange={changeNoticeData}></textarea>
														</td>
													</tr>
													<tr>
														<td className="col-sm-2">내용</td>
														{/* className="form-control"  */}
														<td>
															<textarea cols="100" rows="25" name="content" className="bmic-textarea"
																placeholder="내용을 입력해주세요." value={noticeData.content} onChange={changeNoticeData}></textarea>
														</td>
													</tr>

												</tbody>
											</table>
											<div class="d-grid gap-2 d-md-flex justify-content-md-end">
												<button type="button" class="btn btn-danger btn-sm me-md-2" onClick={() => navigate('/board/noticelist/')}>취소</button>
												<button type="button" class="btn btn-primary btn-sm" onClick={noticeInsert}>저장</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default NoticeBoardInsert;
