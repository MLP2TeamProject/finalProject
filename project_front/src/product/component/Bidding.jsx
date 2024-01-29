import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
//Bidding 페이지에서 입력받은 값을 Table에 전달해야 되는데..

const Bidding = (props) => {
  const navigate = useNavigate();
  const product_id = 1;
  const email = "c@c.c";

  //입찰 데이터 상태
  const [data, setData] = useState({
    email: email,
    product_id: product_id,
    isbn: "",
    auctionPrice: 0,
    quality: "",
    additional: "",
  });

  const changeData = useCallback((e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }, []);

  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [uploadImage, setUploadImage] = useState();

  const [isChecked, setIsChecked] = useState(false);

  // 응답받아온 정보 노출
  const [bookTitle, setBookTitle] = useState("");
  const [bookIsbn, setBookIsbn] = useState("");
  const [bookPrice, setBookPrice] = useState("");

  // 입찰하기 함수
  const insertBidding = async (e) => {
    e.preventDefault();
    console.log("상태데이터", data);
    console.log(title, file);
    if (file) {
      const formData = new FormData();
      formData.append("file1", file);
      formData.append("title", title);
      const inputData = JSON.stringify(data); // 입찰데이터를 string화
      formData.append("inputData", inputData);

      const response = await axios.post(
        "http://localhost:8000/auction/insert",
        formData
      );
      if (response.data.status === 200) {
        window.alert(response.data.message);
        setUploadImage(response.data.data.file_name);
        setBookTitle(response.data.data.title);
        setBookIsbn(response.data.data.isbn);
        setBookPrice(response.data.data.auction_price);
      } else {
        console.error("입찰 실패");
      }
    } else {
      alert("사진이 첨부되지 않았습니다.");
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <form method="post" id="form" encType="multipart/form-data">
          {/* 여기 action="/upload" 지움 */}
          <div className="row g-5">
            <div className="col-md-12 col-lg-6 col-xl-7">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div className="form-item w-100">
                    <label className="form-label my-3">
                      제목, 저자, ISBN<sup>*</sup>
                    </label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="제목, 저자, ISBN"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        name="isbn"
                        id="isbn"
                        value={data.isbn}
                        onClick={changeData}
                        // 여기서 api 가져오는게 필요해서...
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        // onClick={changeData}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-item w-100"></div>
                </div>
              </div>
              <div className="form-item">
                <label className="form-label my-3">
                  입찰가(원)<sup>*</sup>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    name="auctionPrice"
                    id="auctionPrice"
                    value={data.auctionPrice}
                    onChange={changeData}
                  />
                  <span className="input-group-text">₩</span>
                  <span className="input-group-text">WON</span>
                </div>
              </div>
              <div className="form-item">
                <label className="form-label my-3">
                  품질등급 <sup>*</sup>
                </label>

                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="quality"
                  id="quality"
                  value={data.quality}
                  onChange={changeData}
                >
                  <option>품질을 선택해주세요.</option>
                  <option value="1">상</option>
                  <option value="2">중</option>
                  <option value="3">하</option>
                </select>
              </div>

              {/* <form
                id="form"
                // action="/upload"
                //액션 업로드로 해줌
                // method="post"
                encType="multipart/form-data"
              > */}
              {/* 위에 같이 보내서 써도 되나? */}
              <div className="form-item">
                <label className="form-label my-3">
                  사진첨부<sup>*</sup>
                </label>
                <div className="mb-3">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    type="file"
                    name="file1"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <input
                    type="button"
                    value="업로드"
                    // onClick={upload}
                    // onClick={insertBidding}
                  />
                  {/* <input
                      name="file1"
                      // 여기 추가
                      type="file"
                      className="form-control"
                      id="formFileMultiple"
                      multiple
                    />
                    <label
                      htmlFor="formFileMultiple"
                      className="form-label"
                    ></label> */}
                </div>
                {uploadImage ? (
                  <img src={`http://localhost:8000/upload/${uploadImage}`} />
                ) : (
                  ""
                )}
              </div>
              {/* </form> */}
              <br />

              {/* {uploadImage ? (
                <img src={`http://localhost:8000/upload/${uploadImage}`} />
              ) : (
                ""
              )} */}
              <div className="form-item">
                <label className="form-label my-3">
                  상세내용(선택사항)<sup></sup>
                </label>
                <div className="form-item">
                  <textarea
                    className="form-control"
                    spellCheck="false"
                    cols="30"
                    rows="11"
                    placeholder="제품 상세 내용"
                    name="additional"
                    id="additional"
                    value={data.additional}
                    onChange={changeData}
                  ></textarea>
                </div>
              </div>
              <div className="form-check my-3"></div>
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
                        <div className="d-flex align-items-center mt-2">
                          {uploadImage ? (
                            <img
                              src={`http://localhost:8000/upload/${uploadImage}`}
                              style={{ width: "100px" }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </td>
                      <td className="py-5">{bookIsbn}</td>
                      <td className="py-5">{bookTitle}</td>
                      <td className="py-5"></td>
                      <td className="py-5"></td>
                      {/* 이쪽 td는 전부 책 검색하고 나서 선택한 결과가 들어갔으면 좋겠음..되려나? */}
                    </tr>
                    <tr>
                      <th scope="row"></th>
                      <td className="py-5">
                        <p className="mb-0 text-dark text-uppercase py-3">
                          최종입찰가
                        </p>
                      </td>
                      <td className="py-5"></td>
                      <td className="py-5"></td>
                      <td className="py-5">
                        <div className="py-3 border-bottom border-top">
                          <p className="mb-0 text-dark">{bookPrice} 원</p>
                          {/* <p className="mb-0 text-dark">{bidAmount}</p> */}
                          {/* 여기도 최종 입찰가를 작성하면 그 값이 여기로 들어갔으면 좋겠음 */}
                        </div>
                      </td>
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
                      value={isChecked}
                      onChange={() => setIsChecked(!isChecked)}
                    />
                    <label className="form-check-label" htmlFor="isChecked">
                      최종 입찰하시겠습니까?
                    </label>
                  </div>
                  {!isChecked ? (
                    <div className="alert alert-warning">
                      최종 입찰을 위해 체크박스를 선택하세요.
                    </div>
                  ) : (
                    ""
                  )}
                  <p className="text-start text-dark">
                    Make your payment directly into our bank account. Please use
                    your Order ID as the payment reference. Your order will not
                    be shipped until the funds have cleared in our account. Make
                    your payment directly into our bank account. Please use your
                    Order ID as the payment reference. Your order will not be
                    shipped until the funds have cleared in our account. Make
                    your payment directly into our bank account. Please use your
                    Order ID as the payment reference. Your order will not be
                    shipped until the funds have cleared in our account. Make
                    your payment directly into our bank account. Please use your
                    Order ID as the payment reference. Your order will not be
                    shipped until the funds have cleared in our account.
                  </p>
                </div>
              </div>
              <br />
              <br />
              <div className="d-grid gap-2 col-6 mx-auto">
                <button
                  className="btn_3"
                  type="button"
                  onClick={() => navigate(`/detail/${product_id}`)} //백택사용
                >
                  취소하기
                </button>
                <button className="btn_3" type="button" onClick={insertBidding}>
                  입찰하기
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

export default Bidding;
