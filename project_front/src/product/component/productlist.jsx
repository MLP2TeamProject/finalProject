import React, { useCallback, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const ProductList = () => {
    const navigate = useNavigate()
    const [productList, setProductList] = useState({
        status: "", message: "", data: []
    })
    // 서버연동?
    const getProductList = useCallback(async () => {
        try {
            const resp = await axios.get('https://www.nl.go.kr/NL/search/openApi/searchKolisNet.do?key=39b4dd4a523f80ea24ba476b79fc50c968db9622ffd612dc415b4176e41ccadd&kwd=$%7Binput%7D&apiType=json&searchType=&sort=')
            setProductList(resp.data)
        } catch (error) {
            console.error("Error fetching product list:", error);
        }
    }, [])

    useEffect(() => {
        //서버에서 최초에 한번만 데이터를 받아오면 되지 않을까 싶어서..
        getProductList()
    }, [getProductList])



    return (
        <main>
            {/* // <!--================Home Banner Area =================-->
        // <!-- breadcrumb start--> */}
            <div>
                <section className="breadcrumb breadcrumb_bg" style={{ backgroundSize: "300px" }}>
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
                {/* // <!-- breadcrumb start-->

        // <!--================Category Product Area =================--> */}
                <section className="cat_product_area section_padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="left_sidebar_area">
                                    <aside className="left_widgets p_filter_widgets">
                                        <div className="l_w_title">
                                            <h3>Browse Categories</h3>
                                        </div>
                                        <div className="widgets_inner">
                                            <ul className="list">
                                                <li>
                                                    <Link to="#">Frozen Fish</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Dried Fish</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Fresh Fish</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Meat Alternatives</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Fresh Fish</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Meat Alternatives</Link>
                                                    <span>(250)</span>
                                                </li>
                                                <li>
                                                    <Link to="#">Meat</Link>
                                                    <span>(250)</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </aside>

                                    <aside className="left_widgets p_filter_widgets">
                                        <div className="l_w_title">
                                            <h3>Product filters</h3>
                                        </div>
                                        <div className="widgets_inner">
                                            <ul className="list">
                                                <li>
                                                    <Link to="#">Apple</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Asus</Link>
                                                </li>
                                                <li className="active">
                                                    <Link to="#">Gionee</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Micromax</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Samsung</Link>
                                                </li>
                                            </ul>
                                            <ul className="list">
                                                <li>
                                                    <Link to="#">Apple</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Asus</Link>
                                                </li>
                                                <li className="active">
                                                    <Link to="#">Gionee</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Micromax</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Samsung</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </aside>

                                    <aside className="left_widgets p_filter_widgets">
                                        <div className="l_w_title">
                                            <h3>Color Filter</h3>
                                        </div>
                                        <div className="widgets_inner">
                                            <ul className="list">
                                                <li>
                                                    <Link to="#">Black</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Black Leather</Link>
                                                </li>
                                                <li className="active">
                                                    <Link to="#">Black with red</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Gold</Link>
                                                </li>
                                                <li>
                                                    <Link to="#">Spacegrey</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </aside>

                                    <aside className="left_widgets p_filter_widgets price_rangs_aside">
                                        <div className="l_w_title">
                                            <h3>Price Filter</h3>
                                        </div>
                                        <div className="widgets_inner">
                                            <div className="range_item">
                                                {/* <!-- <div id="slider-range"></div> --> */}
                                                <input type="text" className="js-range-slider" value="" />
                                                <div className="d-flex">
                                                    <div className="price_text">
                                                        <p>Price :</p>
                                                    </div>
                                                    <div className="price_value d-flex justify-content-center">
                                                        <input type="text" className="js-input-from" id="amount" readonly />
                                                        <span>to</span>
                                                        <input type="text" className="js-input-to" id="amount" readonly />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="product_top_bar d-flex justify-content-between align-items-center">
                                            <div className="single_product_menu">
                                                <p><span>10000 </span> 상품 리스트</p>
                                            </div>
                                            <div className="single_product_menu d-flex">
                                                <h5>short by : </h5>
                                                <select>
                                                    <option data-display="Select">name</option>
                                                    <option value="1">price</option>
                                                    <option value="2">product</option>
                                                </select>
                                            </div>
                                            <div className="single_product_menu d-flex">
                                                {/* <h5>show :</h5> */}
                                                {/* <Link className="dropdown-item" to="/products/buy"> 상품 구매하기</Link> */}
                                                <Link to="/products/buy" className="list-group-item list-group-item-action list-group-item-danger">상품 구매하기</Link>
                                                <div className="top_pageniation">
                                                    <ul>
                                                        {/* <li>1</li>
                                                        <li>2</li>
                                                        <li>3</li> */}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="single_product_menu d-flex">
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="search"
                                                        aria-describedby="inputGroupPrepend" />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="inputGroupPrepend"><i
                                                            className="ti-search"></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row align-items-center latest_product_inner">

                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_1.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품1</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_2.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품2</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_3.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품3</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_4.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품4</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_5.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품5</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_6.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품6</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_7.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품7</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_8.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품8</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-sm-6">
                                        <div className="single_product_item">
                                            <img src="img/product/product_2.png" alt="" />
                                            <div className="single_product_text">
                                                <h4>상품9</h4>
                                                <h3>$150.00</h3>
                                                <Link to="#" className="add_cart">+ 상품 자세히 보기<i className="ti-heart"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="pageination">
                                            <nav aria-label="Page navigation example">
                                                <ul className="pagination justify-content-center">
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Previous">
                                                            <i className="ti-angle-double-left"></i>
                                                        </Link>
                                                    </li>
                                                    <li className="page-item"><Link className="page-link" to="#">1</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">2</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">3</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">4</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">5</Link></li>
                                                    <li className="page-item"><Link className="page-link" to="#">6</Link></li>
                                                    <li className="page-item">
                                                        <Link className="page-link" to="#" aria-label="Next">
                                                            <i className="ti-angle-double-right"></i>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <!--================End Category Product Area =================-->

        <!-- product_list part start--> */}
                <section className="product_list best_seller">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="section_tittle text-center">
                                    <h2>Best Sellers <span>shop</span></h2>
                                </div>
                            </div>
                        </div>                       
                    </div>
                </section>
                {/* <!-- product_list part end--> */}
            </div>
        </main>
    )
}
export default ProductList