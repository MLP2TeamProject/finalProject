import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductBuy = () => {
    const navigate = useNavigate() //다른 페이지로 이동을 위해서 사용

    // const { id } = useParams()
    const [product, setProduct] = useState({ //상품 정보 저장
        product_id: "",
        title: "",
        email: "",
        master_price: "",
        auction_id: "",
        isbn: "",
    });

    const [searchResults, setSearchResults] = useState([]);

    const changeData = useCallback((e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }, [product])

    // 검색 실행 함수
    const executeSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8000/products/search?input=${product.title}`);
            setSearchResults(response.data)
        } catch (error) {
            console.error('Search failed:', error);
            window.alert("검색 중 오류가 발생했습니다.");
        }
    };

    // 검색 결과를 렌더링하는 함수
    const renderSearchResults = () => {
        return (
            <table className="table  product-margin">
                <thead>
                    <tr>
                        {/* 각 열의 제목들 몇개는 삭제? */}
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
                            <td><img src={item.picture} alt={item.title} style={{ width: '100px' }} /></td>
                            <td>{item.master_price}</td>
                            <td>{new Date(item.endtime).toLocaleString()}</td>
                            <td>{item.auction_status}</td>
                            <td>{item.isbn}</td>
                            <td>{item.content}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleBuyClick(item)}>구매하기</button>
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
                // 다른 필요한 필드도 이곳에 추가할 수 있다.
            });
            // 구매 요청 함수를 호출
            buyProduct();
            navigate("/products/list"); // 절대 경로 사용
        } else {
            alert("취소 되었습니다.")
        }
    }

    const buyProduct = useCallback(async () => {
        try {
            const response = await axios.post('http://localhost:8000/products/buy', product);
            if (response.status === 500) {
                window.alert("상품이 없습니다.");
            } else {
                navigate('/product/list');
            }
        } catch (error) {
            console.error('Purchase failed:', error);
            window.alert("구매 처리 중 오류가 발생했습니다.");
        }
    }, [product, navigate]);

    return (
        <main >
            {/* // <!--================Home Banner Area =================-->
        // <!-- breadcrumb start--> */}
            <div>
                <section className="breadcrumb" style={{
                    // 파일과 사이즈 수정
                    backgroundImage: "url('/img/bmic-page.png')",
                    backgroundSize: "auto",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                    <div className="container product-margin">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="breadcrumb_iner">
                                    {/* <div className="breadcrumb_iner_item">
                                        <h2>ProDuct Buy</h2>
                                        <p>Home <span>-</span> ProDuct Buy</p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* // <!-- breadcrumb start End-->  */}
                <br />
                <aside className="single_sidebar_widget search_widget">
                    {/* 버튼과 관련된 front */}
                    {/* <form onSubmit={executeSearch}>
                        <div className="form-group">
                            <div className="input-group mb-3">
                                <input className="form-control"
                                    type="text"
                                    placeholder='제목을 입력하세요'
                                    name="title"
                                    value={product.title}
                                    onChange={changeData}
                                    
                                    onFocus={(e) => e.target.placeholder = ''}
                                    onBlur={(e) => e.target.placeholder = 'Search Keyword'} />
                                <div className="input-group-append">
                                    <button type='submit' className="button rounded-0 primary-bg text-white w-100 btn_1">
                                        검색하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form> */}
                    {/* 버튼관련 front 수정 */}

                    <form className="form-inline-pds col-12 my-2 my-lg-0">
                        {/* <img src="../img/bmic-img.png" width="40" height="40" className="d-inline-block align-top" alt=""/> */}
                        <img src="../img/bmic-img.png" width="40" height="40" className="search-visiable align-top" alt=""/>
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
                    
                    {/* 검색 결과 */}
                    <div>
                        {renderSearchResults()}
                    </div>
                </aside>
            </div>
        </main >
    )
}

export default ProductBuy