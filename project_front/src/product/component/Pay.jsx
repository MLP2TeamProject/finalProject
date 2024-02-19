const Pay = () => {
  return (
    <section className="checkout_area">
      <div className="container mb-5">
        <div className="returning_customer">
          <div className="check_title"></div>

          <form
            className="row contact_form"
            action="#"
            method="post"
            noValidate
          >
            <div className="col-md-12 form-group"></div>
          </form>
        </div>
        <div className="billing_details">
          <div className="row">
            <div className="col-lg-8">
              <h3>배송정보</h3>
              <form
                className="row contact_form"
                action="#"
                method="post"
                noValidate
              >
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="주문자*"
                  />
                </div>

                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="받는 사람*"
                  />
                </div>

                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="우편번호(-없이 입력해주세요.)*"
                  />
                </div>

                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="배송지*"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="상세주소*"
                  />
                </div>
                <div className="col-md-12 form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    placeholder="휴대전화(-없이 입력해주세요.)*"
                  />
                </div>

                <div className="col-md-12 form-group p_star">
                  <select className="country_select">
                    <option value="1">배송 방법을 선택하세요.</option>
                    <option value="2">집앞 배송</option>
                    <option value="3">편의점 배송</option>
                  </select>
                </div>
                <div className="col-md-12 form-group">
                  <textarea
                    className="form-control"
                    name="message"
                    id="message"
                    rows="1"
                    placeholder="배송 메시지를 남겨주세요.(선택사항)"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="col-lg-4">
              <div className="order_box">
                <h2>주문내역</h2>

                <ul className="list list_2">
                  <li>
                    <a href="#">
                      상품금액
                      <span>40,000원</span>
                    </a>
                    <a href="#">
                      배송비
                      <span>2,000원</span>
                    </a>
                    <a href="#">
                      최종결제금액
                      <span>42,000원</span>
                    </a>
                  </li>
                </ul>
                <div className="payment_item">
                  <div className="radion_btn">
                    <input type="radio" id="f-option5" name="selector" />
                    <label htmlFor="f-option5">무통장입금</label>
                    <div className="check"></div>
                  </div>
                  <p>
                    무통장 입금의 경우 24시간 내로 결제하지 않을 시, 자동으로
                    주문이 취소됩니다.
                  </p>
                </div>
                <div className="payment_item active">
                  <div className="radion_btn">
                    <input type="radio" id="f-option6" name="selector" />
                    <label htmlFor="f-option6">카드결제 </label>
                    <img src="img/product/single-product/card.jpg" alt="" />
                    <div className="check"></div>
                  </div>
                  <p>
                    5만원 이상 구매시 국민, 롯데, 신한, 현대카드 무이자 할부
                    가능(2024.02.01~2024.02.29)
                  </p>
                </div>
                <div className="creat_account">
                  <input type="checkbox" id="f-option4" name="selector" />
                  <label htmlFor="f-option4">이용약관에 동의합니다. </label>
                  <a href="#">이용약관*</a>
                </div>
                <a className="btn_3" href="#">
                  결제하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pay;
