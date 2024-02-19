import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const productId = location.state.productId;
  const productData = location.state.productData;
  console.log(productId, productData, location);

  const [product, setProduct] = useState({
    title: productData.title,
    master_price: productData.master_price,
    content: productData.content,
  });
  const [isChecked, setIsChecked] = useState(false);

  const changeData = (e) => {
    const fieldName = e.target.name;
    if (fieldName === "master_price" || fieldName === "content") {
      setProduct({ ...product, [fieldName]: e.target.value });
    }
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const detailUpdate = async (e) => {
    if (!isChecked) {
      alert("체크 박스를 선택하세요.");
      return;
    }
    console.log("변경하기 직전", productId, product);
    await axios.post("http://localhost:8000/products/update/" + productId, {
      product,
    });

    navigate("/products/detail/" + productId);
  };

  const goToList = () => {
    navigate("/products/list");
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="row g-5">
          <div className="col-md-12 col-lg-6 col-xl-7">
            <div className="row">
              <div className="col-md-12 col-lg-6">
                <div className="form-item w-100"></div>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label my-3"></label>
              <div className="alert alert-danger" role="alert">
                구매 상품의 변경은 불가하며, 즉시구매가격과 상세내용만 변경
                가능합니다.
              </div>
              <div className="input-group">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={product.title}
                    onChange={changeData}
                    placeholder="제목을 입력하세요"
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => (e.target.placeholder = "Search Keyword")}
                    disabled={true}
                  />
                </form>
                <button
                  type="submit"
                  className="btn btn-secondary"
                  disabled={true}
                >
                  검색
                </button>
              </div>
            </div>
            <div className="form-item">
              <label className="form-label my-3">
                즉시구매 가능 가격<sup>*</sup>
              </label>
              <input
                type="number"
                className="form-control"
                name="master_price"
                value={product.master_price}
                placeholder="예)50000 (원 단위로 숫자만 입력하세요.)"
                onChange={changeData}
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
                name="content"
                id="content"
                value={product.content}
                onChange={changeData}
              ></textarea>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 col-xl-5">
            <div className="table-responsive">
              <handleCheckboxChanger />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
            <div className="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
              <div className="col-12">
                <div className="form-check text-start my-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isChecked"
                    name="isChecked"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="isChecked">
                    변경 내용을 저장하시겠습니까?
                  </label>
                </div>

                <p className="text-start text-dark">
                  낙찰기한은 구매를 신청한 시간을 기준으로 30일간 진행됩니다.
                  <br />
                  본 경매는 구매자의 의사에 따라 경매가 중지될 수 있습니다.
                  자세한 내용은 고객센터로 문의해주세요.
                  <br />
                  본 경매는 구매자의 의사에 따라 최종 낙찰 없이 경매가 종료될 수
                  있습니다.
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
              <button className="btn_3" type="button" onClick={goToList}>
                취소하기
              </button>
              <button className="btn_3" type="button" onClick={detailUpdate}>
                변경하기
              </button>
            </div>
          </div>
        </div>
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
export default Update;
