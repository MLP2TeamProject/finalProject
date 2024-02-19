//여기 페이지에서 입찰하기 클릭하면 bidding
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Table from "./Table";
import Timer from "./Timer";
import React, { useCallback, useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import Update from "./Update";

const Detail = () => {
  const context = useContext(UserContext);
  const loggedInUserEmail = context.state.userData.email;

  const navigate = useNavigate();
  const { product_id } = useParams();
  const [product, setProduct] = useState({
    title: "",
    email: "",
    picture: "",
    master_price: "",
    auctuon_id: "",
    endtime: "",
    auction_status: "",
    isbn: "",
    content: "",
    cnt: "",
    createAt: "",
    auctions: [],
  });

  const getDetail = async () => {
    const resp = await axios.get(
      "http://localhost:8000/products/detail/" + product_id
    );

    setProduct(resp.data.data[0]);
  };
  useEffect(() => {
    getDetail();
  }, []);

  const [countdownData, setCountdownData] = useState({
    day: 0,
    hours: 0,
    minuts: 0,
    seconds: 0,
  });

  const [countDownFinished, setCountDownFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/timer/${product_id}`
        );
        console.log("11", response.data);
        const { endtime } = response.data.countdown;
        console.log("endtime...", endtime);
        setCountdownData(endtime);

        const currentTime = new Date().getTime();
        if (currentTime > endtime) {
          setCountDownFinished(true);
        }
      } catch (error) {
        console.error("타이머 불러들이기 실패", error);
      }
    };
    fetchData();
  }, [product_id]);

  const handleBiddingButtonClick = () => {
    if (!loggedInUserEmail) {
      alert("로그인이 필요합니다.");
      return navigate("/user/signin");
    }
    if (loggedInUserEmail === product.email) {
      alert("글 작성자는 입찰 참여가 불가능합니다.");
      return;
    }
    navigate("/products/bidding/" + product_id);
  };

  const goUpdate = () => {
    navigate("/products/update", {
      state: {
        productId: product_id,
        productData: product,
      },
    });
  };

  return (
    <div>
      <div className="product_image_area section_padding">
        <div className="container">
          <div className="row s_product_inner justify-content-between">
            <div className="col-lg-7 col-xl-7">
              <div className="product_slider_img text-center">
                <img
                  src={`http://localhost:8000/static/upload/${product.picture}`}
                  style={{ width: "400px" }}
                  alt="boookImage"
                />
              </div>
            </div>
            <div className="col-lg-5 col-xl-4">
              <div className="s_product_text">
                <h3>{product.title}</h3>
                <br />
                <ul className="list">
                  <li>
                    <span>ISBN : {product.isbn}</span>
                    <br />
                    <span>구매희망자 : {product.email}</span>
                    <br />
                    <span>입찰시작일 : {product.createAt}</span>
                    <br />
                    <br />
                  </li>
                  <br />
                  <br />
                </ul>

                <h3>낙찰까지 남은 시간</h3>
                <Timer endtime={countdownData} />
                <br />

                <hr />
                <br />
                <h3>즉시구매가 {product.master_price}원</h3>
                <br />
                <div className="alert alert-danger" role="alert">
                  즉시구매가는 구매자가 정한 금액입니다. 즉시구매가로 입찰에
                  참여할시 낙찰 가능성이 높아집니다.
                </div>
                <br />
                <br />
                {!loggedInUserEmail || loggedInUserEmail !== product.email ? (
                  <button
                    className="btn_3"
                    onClick={handleBiddingButtonClick}
                    disabled={countDownFinished}
                    style={{ width: "350px" }}
                  >
                    판매입찰하기
                  </button>
                ) : null}

                <br />
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <p>
          {product.content}
          <br />
          <br />
          <br />
          {loggedInUserEmail === product.email ? (
            <div className="d-grid gap-2 col-2 mx-auto">
              <button
                id="editButton"
                className="btn btn-warning"
                type="button"
                onClick={goUpdate}
              >
                게시글수정
              </button>
            </div>
          ) : (
            ""
          )}
        </p>
      </div>

      <section className="confirmation_part padding_top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="confirmation_tittle">
                <span>입찰 현황을 확인하세요</span>
              </div>
            </div>
            <div>
              <Table auctions={product.auctions} />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end"></div>
            <div className="col-lg-4 col-lx-4"></div>
            <div className="col-lg-4 col-lx-4"></div>
            <div className="row">
              <div className="col-lg-12"></div>
            </div>
          </div>
        </div>
      </section>
      <section className="product_description_area"></section>
    </div>
  );
};

export default Detail;
