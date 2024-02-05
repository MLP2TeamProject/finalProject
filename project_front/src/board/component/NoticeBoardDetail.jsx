// 공지 페이지 목록에서 title을 누르고 들어가면 나온느 페이지
// 업데이트, 삭제, 목록으로 들어가기 버튼이 필요.
// 글 삭제 기능은 이곳에서 구현.

import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserContext from "../../UserContext";

const NoticeBoardDetail = () => {
	const navigate = useNavigate();

	// 관리자인가 확인하기 위하여 공개된 전역상태 함수를 이용.
	const context = useContext(UserContext);
	const isadmin = context.state.userData.isadmin;

	const { id } = useParams();

	// 서버에서 받은 데이터.. 초기값
	const [noticeBoard, setNoticeBoard] = useState({
		content: "",
		title: "",
		cnt: "",
		createdAt: "",
	});

	// 서버 연동을 위한 함수.. 어디선가 호출한다..
	const getNoticeBoardDetail = async () => {
		const resp = await axios.get("http://localhost:8000/boards/noticeBoard/" + id);
		//
		setNoticeBoard(resp.data.data);
	};

	// 최초한번 실행
	useEffect(() => {
		getNoticeBoardDetail();
	}, []);

	const noticeDeleteBoard = async (id) => {
		console.log("00");
		await axios.post("http://localhost:8000/boards/noticeDelete/" + id);
		console.log("11");
		navigate("/board/noticelist");
	};

	return (
		<div>
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
														<td className="col-sm-10">{noticeBoard.title}</td>
													</tr>
													<tr>
														<td className="col-sm-2"> 작성일</td>
														<td className="col-sm-10">{noticeBoard.createAt}</td>
													</tr>
													<tr>
														<td className="col-sm-2">내용</td>
														<td>{noticeBoard.content}</td>
													</tr>
												</tbody>
											</table>

											{/* <div className="container">
												<div className="col-auto">
                                                    <button type="button" className="btn btn-primary btn-sm float-right" onClick={() => navigate('/board/noticelist')}>목록</button>
                                                    {
                                                        isadmin === "Y"
                                                        //  관리자인 경우 버튼이 나타남 
                                                        ?
                                                        <div>
                                                        <button type="button" className="btn btn-warning btn-sm float-right bnt-space" onClick={() => navigate('/board/noticeupdate/'+id)}>수정</button>
                                                        <button type="button" className="btn btn-danger btn-sm float-right bnt-space" onClick={()=> noticeDeleteBoard(noticeBoard.notice_id)} >삭제</button>
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                                    
												</div>
											</div> */}

											<div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                {
                                                    isadmin === "Y"
                                                    //  관리자인 경우 버튼이 나타남 
                                                    ?
                                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                                        <button className="btn btn-danger btn-sm" type="button" onClick={()=> noticeDeleteBoard(noticeBoard.notice_id)} >삭제</button>
                                                        <button className="btn btn-warning btn-sm" type="button" onClick={() => navigate('/board/noticeupdate/'+id)}>수정</button>
                                                        </div>
                                                        :
                                                        ""
                                                    }
                                            <button className="btn btn-primary btn-sm" type="button" onClick={() => navigate('/board/noticelist')}>목록</button>
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

export default NoticeBoardDetail;
