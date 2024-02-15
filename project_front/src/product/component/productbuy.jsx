import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//검색 버튼 클릭하면, api랑 연결돼서 결과가 밑에 table에 뜨고
//확인하기 누르면 오른쪽 책 정보에 저장이 되고
//즉시거래희망가격은 입력시 detail에 적용되어야 하고
//취소하기 누르면 navigate로 list로
//신청하기 누르면 list에 추가가 되어야 함...

const ProductBuy = () => {
    const navigate = useNavigate(); //다른 페이지로 이동을 위해서 사용

    const [product, setProduct] = useState({
        product_id: "",
        title: "",
        email: "",
        master_price: "",
        auction_id: "",
        isbn: "",
    });

    //현재 검색된 결과를 저장하는 배열
    const [searchResults, setSearchResults] = useState([]);

    //입력 필드값 변경되면 상태 업데이트
    const changeData = useCallback(
        (e) => {
            setProduct({ ...product, [e.target.name]: e.target.value });
        },
        [product]
    );

    // 검색 실행 함수 (서버 검색 요청)
    const executeSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://localhost:8000/products/search?input=${product.title}`
            );
            setSearchResults(response.data);
        } catch (error) {
            console.error("Search failed:", error);
            window.alert("검색 중 오류가 발생했습니다.");
        }
    };

    // 검색 결과를 렌더링하는 함수
    const renderSearchResults = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>사진</th>
                        <th>즉시 구매가</th>
                        <th>경매 종료시간</th>
                        <th>경매 상태</th>
                        <th>ISBN</th>
                        <th>내용</th>
                        <th>구매</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>
                                <img
                                    src={item.picture}
                                    alt={item.title}
                                    style={{ width: "100px" }}
                                />
                            </td>
                            <td>{item.master_price}</td>
                            <td>{new Date(item.endtime).toLocaleString()}</td>
                            <td>{item.auction_status}</td>
                            <td>{item.isbn}</td>
                            <td>{item.content}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleBuyClick(item)}
                                >
                                    구매하기
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const handleBuyClick = (item) => {
        // 상품 정보를 설정하고 구매 요청을 보냄
        const confirmPurchase = window.confirm("구매하시겠습니까?");
        if (confirmPurchase) {
            // 사용자가 확인을 클릭한 경우 상품 정보를 설정하고 구매 요청을 보냄
            setProduct({
                ...product,
                product_id: item.product_id,
                title: item.title,
                master_price: item.master_price,
                isbn: item.isbn,
            });
            // 구매 요청 함수를 호출
            buyProduct();
            navigate("/products/list"); // 절대 경로 사용
        } else {
            alert("취소 되었습니다.");
        }
    };

    const buyProduct = useCallback(async () => {
        try {
            const response = await axios.post(
                "http://localhost:8000/products/buy",
                product
            );
            if (response.status === 500) {
                window.alert("상품이 없습니다.");
            } else {
                navigate("/product/list");
            }
        } catch (error) {
            console.error("Purchase failed:", error);
            window.alert("구매 처리 중 오류가 발생했습니다.");
        }
    }, [product, navigate]);

    return (
        <div className="container-fluid py-5">
            <div className="container py-5">
                <form id="form" encType="multipart/form-data">
                    <div className="row g-5">
                        <div className="col-md-12 col-lg-6 col-xl-7">
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <div className="form-item w-100"></div>
                                </div>
                            </div>
                            {/* <div className="form-item">
                                <label className="form-label my-3"></label>
                                <div className="input-group">
                                    <form onSubmit={executeSearch}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="title"
                                            value={product.title}
                                            onChange={changeData}
                                            placeholder="제목을 입력하세요"
                                            onFocus={(e) => (e.target.placeholder = "")}
                                            onBlur={(e) => (e.target.placeholder = "Search Keyword")}
                                        />
                                    </form>
                                    <button type="submit" className="btn btn-secondary">
                                        검색
                                    </button>
                                </div>
                            </div> */}
                            <form className="form-inline-pds col-12 my-2 my-lg-0" onSubmit={executeSearch}>
                                {/* <img src="../img/bmic-img.png" width="40" height="40" className="d-inline-block align-top" alt=""/> */}
                                {/* <img src="../img/bmic-img.png" width="40" height="40" className="search-visiable align-top" alt="" /> */}
                                <input className="form-control col-sm-10 mr-sm-2"
                                    type="text"
                                    placeholder="제목을 입력하세요."
                                    name="title"
                                    value={product.title}
                                    onChange={changeData}
                                    onFocus={(e) => e.target.placeholder = ''}
                                    onBlur={(e) => e.target.placeholder = 'Search Keyword'} />
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form>
                            <br />
                            <div className="form-item">
                                <label className="form-label my-3">책 정보 불러오기</label>
                                {renderSearchResults()}
                            </div>
                            <br />
                            {/*  */}
                            <div className="form-item">
                                <label className="form-label my-3">
                                    즉시구매 가능 가격<sup>*</sup>
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="master_price"
                                    placeholder="예)50000 (원 단위로 숫자만 입력하세요.)"
                                />
                            </div>
                            <div className="form-item">
                                <label className="form-label my-3">상세내용(선택사항)</label>

                                <textarea
                                    className="form-control"
                                    spellCheck="false"
                                    cols="30"
                                    rows="11"
                                    placeholder="구매를 원하는 상품의 정보와 상태를 기입해주세요."
                                    name="additional"
                                    id="additional"
                                ></textarea>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6 col-xl-5">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">ISBN </th>
                                            <th scope="col">제목</th>
                                            <th scope="col"></th>
                                            <th scope="col">저자</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td scope="row">
                                                {/* <div className="d-flex align-items-center mt-2">
                          사진
                        </div> */}
                                            </td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                            <td className="py-5"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                                <div className="col-12">
                                    <div className="form-check text-start my-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isChecked"
                                            name="isChecked"
                                        />
                                        <label className="form-check-label" htmlFor="isChecked">
                                            구매 신청하시겠습니까?
                                        </label>
                                    </div>

                                    <p className="text-start text-dark">
                                        낙찰기한은 구매를 신청한 시간을 기준으로 30일간 진행됩니다.
                                        <br />
                                        본 경매는 구매자의 의사에 따라 경매가 중지될 수 있습니다.
                                        자세한 내용은 고객센터로 문의해주세요.
                                        <br />
                                        본 경매는 구매자의 의사에 따라 최종 낙찰 없이 경매가 종료될
                                        수 있습니다.
                                        <br />
                                        구매자가 희망하는 즉시구매가로 해당 상품이 경매에 참여할 시,
                                        남은 경매 기간과 상관없이 바로 경매를 체결할 수 있습니다.
                                        <br />
                                    </p>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div className="d-grid gap-2 col-6 mx-auto">
                                <button className="btn_3" type="button">
                                    취소하기
                                </button>
                                <button className="btn_3" type="button">
                                    구매신청하기
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <a
                href="#"
                className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
            >
                <i className="fa fa-arrow-up"></i>
            </a>
        </div>
    );
};

export default ProductBuy;