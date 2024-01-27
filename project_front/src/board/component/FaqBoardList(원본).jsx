// 고객센터 부분에서 목록 내용을 표시하는 페이지. 
// icon 적용 시키기

import axios from 'axios'
import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'


const FaqBoardList = () => {

    const navigate = useNavigate()

    const [faqBoarList, setFaqBoardList] = useState({
        status: "", message: "", data: []
    })

    const getFaqBoardList = useCallback(async () => {
        const resp = await axios.get('http://localhost:8000/boards/faqBoardList', faqBoarList)
        setFaqBoardList(resp.data)
    }, [])

    useEffect(() => {
        getFaqBoardList()
    }, [getFaqBoardList])

    return (
        <div>
            {/* <h2>test - FnaBoardList page</h2> */}
            {/* <!-- ================ contact section start ================= --> */}

            <section className="contact-section padding_top">
                <div className="container">
                    <div className="row col-12">
                    <div className="col-sm-2">
							<h2>고객센터</h2>
						</div>
						<div className="col-sm-10">
							<h2 className="contact-title">자주 묻는 질문</h2>
						</div>
                        <div className="col-lg-2">
                            <Link to={"/board/noticelist"}>
                                <p className="text-bg-dark p-3">공지사항</p>
                            </Link>
                            <Link to={"/board/faqlist"}>
                                <p className="text-bg-secondary p-3">FAQ</p>
                            </Link>
                        </div>
                        <div className="col-lg-10">

                            <form className="form-contact contact_form" action="contact_process.php" method="post" id="contactForm"
                                >
                                <div className="row">
                                    <div className="col-lg-12">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th className='col-sm-4 col-md-6'>제목</th>
                                                    <th className='col-6 col-md-4'>작성일</th>
                                                    <th className='col-6 col-md-2'>조회수</th>
                                                </tr>
                                            </thead>
                                            <tbody className="table-group-divider">
                                                {faqBoarList.data.map((faqli) => (
                                                    <tr key={faqli.faq_id}>
                                                        {/* <td>{li.faq_id}</td> */}
                                                        <td>{faqli.title}</td>
                                                        <td>{faqli.createAt}</td>
                                                        <td>{faqli.cnt}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </form>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* <!-- ================ contact section end ================= --> */}



            {/* 숫자 버튼으로 페이지를 넘어감. */}

            <div className="col-lg-12" >
                <div className="pageination">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <i className="ti-angle-double-left"></i>
                                </a>
                            </li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                            <li className="page-item"><a className="page-link" href="#">6</a></li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <i className="ti-angle-double-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            {/* 끝 부분 */}
        </div>
    )
}

export default FaqBoardList