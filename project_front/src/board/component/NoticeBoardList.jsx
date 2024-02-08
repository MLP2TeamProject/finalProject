import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../UserContext";

const NoticeBoardList = () => {
	// 관리자인가 확인하기 위하여 공개된 전역상태 함수를 이용.
	const context = useContext(UserContext);
	const isadmin = context.state.userData.isadmin;
	console.log("000", isadmin);

	// pagination
	const perPageItemNum = 13 // 한 페이지에 보여줄 항목 개수
	const perGroupPageNum = 3 // 한 그룹에 보여줄 페이지 개수

	const [pageState, setPageState] = useState({
		totalCount: 0, //전체 항목 개수
		totalPageCount: 0, //전체 페이지 개수 
		totalGroupCount: 0, //전체 그룹 개수
		currentPage: 1, //현재 페이지
		currentPageGroup: 0, //현재 페이지그룹
		pageArray: [], // 현재 그룹의 페이지 배열
		serverData: [] // 항목 배열
	})

	//서버연동..
	const getServerProductList = async (group, pageNum) => {
		const resp = await axios.get("http://localhost:8000/boards/listpage1/" + pageNum + "/" + perPageItemNum)
		if (resp.data.status === 500) console.log("notice board 리스트 조회 실패")
		else {
			console.log("항목", resp.data.data, "총개수", resp.data.totalCount)
			const totalCount = resp.data.totalCount
			const totalPageCount = Math.ceil(totalCount / perPageItemNum)
			const totalGroupCount = Math.ceil(totalPageCount / perGroupPageNum)
			const serverData = resp.data.data
			let pageArray = []

			if (totalPageCount - (group * perGroupPageNum) < perGroupPageNum) {
				pageArray = Array.from({ length: totalPageCount - (group * perGroupPageNum) }, (_, index) => index + (group * perGroupPageNum) + 1)
			} else {
				pageArray = Array.from({ length: perGroupPageNum }, (_, index) => index + 1 + (group * perGroupPageNum))
			}

			console.log(totalCount, totalPageCount, totalGroupCount, serverData, pageArray)
			setPageState({ ...pageState, totalCount, totalPageCount, totalGroupCount, serverData, pageArray, currentPage: pageNum, currentPageGroup: group })
		}
	}

	useEffect(() => {
		//초기 서버 데이터 획득 호출.. 
		getServerProductList(0, 1) // 0 그룹, 1 페이지 넘버 
	}, [])

	const onClickPage = (page) => {
		getServerProductList(pageState.currentPageGroup, page)
	}
	const onMoveGroup = (group, page) => {
		getServerProductList(group, page)
	}



	// 프론트
	// 아래의 글쓰기 버튼에서 관리자 여부에 따라 버튼이 나타나고, 나타나지 않음.
	return (
		<div>
			{/* <h2>test - NoticeBoardList page</h2> */}

			{/* <!-- ================ contact section start ================= --> */}

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
												<thead>
													<tr>
														<th className="col-sm-4 col-md-6">제목</th>
														<th className="col-6 col-md-4">작성일</th>
														<th className="col-6 col-md-2">조회수</th>
													</tr>
												</thead>
												<tbody className="table-group-divider">
													{pageState.serverData.map((item, index) => (
														<tr key={index}>
															<td>
																<Link to={`/board/noticedetail/${item.notice_id}`}>{item.title}</Link>
															</td>
															<td>{item.createAt}</td>
															<td>{item.cnt}</td>
														</tr>
													))}
												</tbody>
												<tfoot>
													{   // 관리자인지 확인해서 글쓰기 버튼을 나타내게 함
														isadmin === "Y"
															? <tr>
																<td colSpan={5}>
																	<Link to={"/board/noticeinsert"}>
																		<button className="btn btn-primary btn-sm float-right">글쓰기</button>
																	</Link>
																</td>
															</tr>
															: ""
													}
												</tfoot>
											</table>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
			
			{/* pagination */}

			{/* <p>현재페이지: {pageState.currentPage} / 총 페이지: {pageState.totalPageCount}</p>
			<p>현재그룹: {pageState.currentPageGroup} / 총 그룹: {pageState.totalGroupCount}</p> */}
			<nav className="justify-content-center d-flex">
				<ul className="pagination">
					<li className={pageState.currentPageGroup === 0 ? "page-item disabled" : "page-item"}>
						<a href="#" className="page-link" aria-label="Previous"
							onClick={() => onMoveGroup(pageState.currentPageGroup - 1, (pageState.currentPageGroup - 1) * perGroupPageNum + 1)}>
							<i className="ti-angle-double-left"></i>
						</a>
					</li>
					<li className={pageState.currentPage === pageState.pageArray[0] ? "page-item disabled" : "page-item"}>
						<a href="#" className="page-link" aria-label="Previous"
							onClick={() => onClickPage(pageState.currentPage - 1)}>
							<i className="ti-angle-left"></i>
						</a>
					</li>
					{pageState.pageArray.map((item, index) => (
						<li className={pageState.pageArray[index] === pageState.currentPage ? "page-item active" : "page-item"} key={index}>
							<a href="#N" className="page-link" onClick={(e) => onClickPage(Number(e.target.text))}>
								{item}
							</a>
						</li>
					))}
					<li className={pageState.currentPage === pageState.pageArray[pageState.pageArray.length - 1] ? "page-item disabled" : "page-item"}>
						<a href="#" className="page-link" aria-label="Next" onClick={() => onClickPage(pageState.currentPage + 1)}>
							<i className="ti-angle-right"></i>
						</a>
					</li>
					<li className={pageState.currentPageGroup === pageState.totalGroupCount - 1 ? "page-item disabled" : "page-item"}>
						<a href="#" className="page-link" aria-label="Next"
							onClick={() => onMoveGroup(pageState.currentPageGroup + 1, (pageState.currentPageGroup + 1) * perGroupPageNum + 1)}>
							<i className="ti-angle-double-right"></i>
						</a>
					</li>
				</ul>
			</nav>

		</div>
	);
};

export default NoticeBoardList;