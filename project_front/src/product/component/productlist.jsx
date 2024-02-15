import React, { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';


const ProductList = () => {
    const [productList, setProductList] = useState({ status: "", message: "", data: [] });
    const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 (0부터 시작)
    const [pageCount, setPageCount] = useState(0); // 총 페이지 수

    const productsPerPage = 5; // 한 페이지당 상품 수
    const [itemsCount, setItemsCount] = useState(0) // 총 상품 수

    const getProductList = useCallback(async () => {
        try {
            const resp = await axios.get(`http://localhost:8000/products/listpage1/${currentPage + 1}/${productsPerPage}`);
            console.log("데이터 확인", resp.data);
            setProductList(resp.data);
            setPageCount(Math.ceil(itemsCount / productsPerPage)); // 총 페이지 수 계산 및 설정
            setItemsCount(resp.data.totalCount)
        } catch (error) {
            console.error("데이터 가져오기 실패", error);
        }
    }, [currentPage]);

    useEffect(() => {
        getProductList();
    }, [getProductList]);

    const handlePageClick = (event) => {
        setCurrentPage(event.selected); // 페이지 번호 업데이트
    };



    return (
        <main>
            {/*  <!--================Home Banner Area =================-->
        <!-- breadcrumb start--> */}
            <div>
                <section className="breadcrumb" style={{
                    backgroundImage: "url('/img/b-mic.png')",
                    backgroundSize: "300px",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    {/* <section className="breadcrumb breadcrumb_bg"> style={{backgroundImage: "url(img/b-mic.png)"}} */}
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="breadcrumb_iner">
                                    <div className="breadcrumb_iner_item">
                                        <h2>ProDuct List</h2>
                                        <p>Home <span>-</span> ProDuct List</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!-- breadcrumb start--> */}

                {/* <!--================Category Product Area =================--> */}
                <section className="cat_product_area section_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product_top_bar d-flex justify-content-between align-items-center">
                                    <div className="single_product_menu">
                                        <p>총 {itemsCount} 상품 리스트</p>
                                    </div>
                                    {/* <div className="single_product_menu d-flex">
                                        <Link to="/products/buy" className="list-group-item list-group-item-action list-group-item-danger">상품 구매하기</Link>
                                        <div className="top_pageniation">
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row align-items-center latest_product_inner">
                            {productList.data.map((product, index) => (
                                <div className="col-lg-4 col-sm-6" key={index}>
                                    <div className="single_product_item">
                                        <div className="single_product_text">
                                            {product.picture ? <img src={`http://localhost:8000/upload/${product.picture}`} alt="" style={{height:'180px'}} /> : 
                                            <img src='/img/default-image.png' alt="" style={{height:'180px'}} />}
                                        </div>
                                        
                                        <div className="single_product_text">
                                            <h4>{product.title}</h4>
                                            <h3>즉시구매가: {product.master_price} 원</h3>
                                            <Link to={`/products/detail/${product.product_id}`} className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-12">
                            <div className="pagination justify-content-center">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="다음 >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< 이전"
                                    renderOnZeroPageCount={null}
                                    containerClassName={"pagination"} // Bootstrap의 페이지네이션 컨테이너 클래스
                                    pageClassName={"page-item"} // 각 페이지 항목에 대한 클래스
                                    pageLinkClassName={"page-link"} // 페이지 번호 링크에 대한 클래스
                                    previousClassName={"page-item"} // 이전 버튼 항목에 대한 클래스
                                    previousLinkClassName={"page-link"} // 이전 버튼 링크에 대한 클래스
                                    nextClassName={"page-item"} // 다음 버튼 항목에 대한 클래스
                                    nextLinkClassName={"page-link"} // 다음 버튼 링크에 대한 클래스
                                    activeClassName={"active"} // 현재 활성화된 페이지 항목에 대한 클래스
                                />
                            </div>
                        </div>
                    </div>

                </section>
                {/* <!--================End Category Product Area =================--> */}
            </div >
        </main >
    )
}


export default ProductList