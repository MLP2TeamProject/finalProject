import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const SearchKeyword = () => {
	// 검색결과 상태데이터
	const [resultList, setResultList] = useState([]);

	// navigate에서 넘긴 데이타 받아오기
	const location = useLocation();
	const result = location.state;

	// 페이징
	const perPageItemNum = 3; // 한 페이지에 보여줄 항목 개수
	const perGroupPageNum = 5; // 한 그룹에 보여줄 페이지 개수

	//상태..
	const [pageState, setPageState] = useState({
		totalCount: 0, //전체 항목 개수
		totalPageCount: 0, //전체 페이지 개수
		totalGroupCount: 0, //전체 그룹 개수
		currentPage: 1, //현재 페이지
		currentPageGroup: 0, //현재 페이지그룹
		pageArray: [], // 현재 그룹의 페이지 배열
		serverData: [], // 항목 배열
	});

	const paging = (group, pageNum) => {
		const totalCount = resultList.length;
		const totalPageCount = Math.ceil(totalCount / perPageItemNum);
		const totalGroupCount = Math.ceil(totalPageCount / perGroupPageNum);
		const serverData = resultList.slice(
			(pageNum - 1) * perPageItemNum,
			(pageNum - 1) * perPageItemNum + perPageItemNum
		);
		let pageArray = [];

		if (totalPageCount - group * perGroupPageNum < perGroupPageNum) {
			pageArray = Array.from(
				{ length: totalPageCount - group * perGroupPageNum },
				(_, index) => index + 1 + group * perGroupPageNum
			);
		} else {
			pageArray = Array.from(
				{ length: perGroupPageNum },
				(_, index) => index + 1 + group * perGroupPageNum
			);
		}
		// console.log('셋팅값', totalCount, totalPageCount, totalGroupCount, serverData, pageArray)
		setPageState({
			...pageState,
			totalCount,
			totalPageCount,
			totalGroupCount,
			serverData,
			pageArray,
			currentPage: pageNum,
			currentPageGroup: group,
		});
	};

	const onClickPage = (page) => {
		paging(pageState.currentPageGroup, page);
	};
	const onMoveGroup = (group, page) => {
		paging(group, page);
	};

	useEffect(() => {
		// console.log('받은결과', result)
		setResultList(result);
	}, [location.state]);

	useEffect(() => {
		paging(0, 1);
	}, [resultList]);

	return (
		<section className="cart_area" style={{ marginTop: '140px' }}>
			<div className="container">
				<div className="col-lg-12">
					<h3>검색결과 목록</h3>
				</div>
				<div className="cart_inner">
					<table className="table">
						<thead className="table-light">
							<tr>
								<th scope="col">
									<strong>product_id</strong>
								</th>
								<th scope="col">
									<strong>도서명</strong>
								</th>
								<th scope="col">
									<strong>등록이메일</strong>
								</th>
								<th scope="col">
									<strong>즉시구매가</strong>
								</th>
								<th scope="col">
									<strong>요청사항</strong>
								</th>
							</tr>
						</thead>
						<tbody>
							{pageState.serverData[0] ? (
								<>
									{pageState.serverData.map((item, index) => (
										<tr key={index}>
											<td>{item.product_id}</td>
											<td>
												<img
													src={`http://localhost:8000/static/upload/${item.picture}`}
													style={{ width: '80px' }}
												/>{' '}
												<Link
													to={`/products/detail/${item.product_id}`}>
													{item.title}
												</Link>
											</td>
											<td>{item.email}</td>
											<td>{item.master_price}</td>
											<td>{item.content}</td>
										</tr>
									))}
								</>
							) : (
								<tr>
									<td colSpan={5} className="text-center">
										검색 결과가 없습니다
									</td>
								</tr>
							)}
						</tbody>
					</table>
					{resultList[0] ? (
						<>
							{/* <p>현재페이지: {pageState.currentPage} / 총 페이지: {pageState.totalPageCount}</p>
                        <p>현재그룹: {pageState.currentPageGroup} / 총 그룹: {pageState.totalGroupCount}</p>
                        <p>페이지배열 : {pageState.pageArray}</p> */}
							<nav className="justify-content-center d-flex">
								<ul className="pagination">
									<li
										className={
											pageState.currentPageGroup === 0
												? 'page-item disabled'
												: 'page-item'
										}>
										<a
											href="#"
											className="page-link"
											aria-label="Previous Group"
											onClick={(e) => {
												e.preventDefault();
												onMoveGroup(
													pageState.currentPageGroup -
														1,
													(pageState.currentPageGroup -
														1) *
														perGroupPageNum +
														1
												);
											}}>
											<i className="ti-angle-double-left"></i>
										</a>
									</li>
									<li
										className={
											pageState.currentPage ===
											pageState.pageArray[0]
												? 'page-item disabled'
												: 'page-item'
										}>
										<a
											href="#"
											className="page-link"
											aria-label="Previous page"
											onClick={(e) => {
												e.preventDefault();
												onClickPage(
													pageState.currentPage - 1
												);
											}}>
											<i className="ti-angle-left"></i>
										</a>
									</li>
									{pageState.pageArray.map((item, index) => (
										<li
											className={
												pageState.pageArray[index] ===
												pageState.currentPage
													? 'page-item active'
													: 'page-item'
											}
											key={index}>
											<a
												href="#N"
												className="page-link"
												onClick={(e) => {
													e.preventDefault();
													onClickPage(
														Number(e.target.text)
													);
												}}>
												{item}
											</a>
										</li>
									))}
									<li
										className={
											pageState.currentPage ===
											pageState.pageArray[
												pageState.pageArray.length - 1
											]
												? 'page-item disabled'
												: 'page-item'
										}>
										<a
											href="#"
											className="page-link"
											aria-label="Next page"
											onClick={(e) => {
												e.preventDefault();
												onClickPage(
													pageState.currentPage + 1
												);
											}}>
											<i className="ti-angle-right"></i>
										</a>
									</li>
									<li
										className={
											pageState.currentPageGroup ===
											pageState.totalGroupCount - 1
												? 'page-item disabled'
												: 'page-item'
										}>
										<a
											href="#"
											className="page-link"
											aria-label="Next Group"
											onClick={(e) => {
												e.preventDefault();
												onMoveGroup(
													pageState.currentPageGroup +
														1,
													(pageState.currentPageGroup +
														1) *
														perGroupPageNum +
														1
												);
											}}>
											<i className="ti-angle-double-right"></i>
										</a>
									</li>
								</ul>
							</nav>
						</>
					) : (
						''
					)}
				</div>
			</div>
		</section>
	);
};

export default SearchKeyword;
