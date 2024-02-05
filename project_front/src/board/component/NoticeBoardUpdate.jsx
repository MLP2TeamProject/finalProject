// 공지 내용을 수정할 수 있는 버튼을 누르면 나오는 페이지. (관리자만 가능)

import axios from 'axios'
import { useState, useEffect}  from 'react'
import {useNavigate, useParams, Link}  from 'react-router-dom'

const NoticeBoardUpdate = () =>{

    const navigate = useNavigate()

    const { id } = useParams();

    const [noticeBoard, setNoticeBoard] = useState({ id:'', title: "", content: "", createAt:'' });

    const changeNoticeData = (e) => {
        setNoticeBoard({ ...noticeBoard, [e.target.name]: e.target.value })
    }


    const getNoticeData = async () => {
        const resp = await axios.get("http://localhost:8000/boards/noticeBoard/" + id);
        setNoticeBoard(resp.data.data)
    }

    useEffect(() => {
        getNoticeData()
    }, [])

    const updateNoticeBoard = async (e) => {
        await axios.post('http://localhost:8000/boards/noticeupdate/', noticeBoard)
        navigate('/board/noticelist')
    }

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
                                <hr/>
                                
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
                                                        <td><textarea cols="100" rows="1" name='title' placeholder={noticeBoard.title} className="bmic-textarea"
                                                            value={noticeBoard.title} onChange={changeNoticeData}></textarea></td>
													</tr>
													<tr>
														<td className="col-sm-2">내용</td>
														<td>
															<textarea cols="100" rows="25" name='content' placeholder={noticeBoard.content} className="bmic-textarea"
                                                                value={noticeBoard.content} onChange={changeNoticeData}></textarea>
														</td>
													</tr>
												</tbody>
											</table>
											<hr />
											<div className="container">
												<div className="col-auto">
													<button type="button" className="btn btn-primary btn-sm float-right" onClick={updateNoticeBoard}>저장</button>
                                                    <button type="button" className="btn btn-warning btn-sm float-right bnt-space" onClick={() => navigate('/board/noticedetail/'+ noticeBoard.notice_id)}>취소</button>
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
		</div>
    )
}

export default NoticeBoardUpdate