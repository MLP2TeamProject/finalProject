/* eslint-disable */

import React, {useCallback, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const Home = () => {

	// New Buy 상태
	const [newBuy, setNewBuy] = useState([{}])
	// 상품정보 get
	const getNewBuy = useCallback(async ()=> {
		const resp = await axios.get('http://localhost:8000/home/newbuy')
		if(resp.data.status === 500) window.alert(resp.data.message)
		else {
			// console.log('상품정보', resp.data.data)
			setNewBuy(resp.data.data)
		}        
	}, [])

	// Auction Buy 상태
	const [auctionBuy, setAuctionBuy] = useState([{}])
	// 입찰정보 get
	const getAuctionBuy = useCallback(async ()=> {
		const resp = await axios.get('http://localhost:8000/home/auctionbuy')
		if(resp.data.status === 500) window.alert(resp.data.message)
		else {
			// console.log('입찰정보', resp.data.data)
			setAuctionBuy(resp.data.data)
		}        
	}, [])	

	// 페이지 진입 시 실행
	useEffect(()=>{
        getNewBuy()
		getAuctionBuy()
    }, []) 

	return (
		<div>
			{/*
        - html 주석..
        - html 은 single tag 를 허용하지만.. jsx 는 xml 문법이다. single tag  허용하지 않는다..
        - a => Link
        - class => className
        - style : inline style, jsx - javascript 표현식으로..
        - 이미지 경로 public 의 images 로 변경..
       */}
			{/* <!--::banner_part start::--> */}
			<section className="banner_part  padding_top">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-12">
							<div className="single_banner_slider">
								<div className="row">
									{/* <div className="col-lg-5 col-md-8"> */}
									<div className="banner_text">
										<div className="banner_text_iner">
											<img
												src="img/banner_img1.png"
												alt="banner0"
											/>
										</div>
									</div>
									{/* </div> */}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			{/* <!-- banner_part  end--> */}

			{/* <!-- feature_part1 start--> */}
			<section className="feature_part padding_top">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12">
							<div className="section_tittle text-center">
								<h2>New buy</h2>
								<h5>신규 구매 등록</h5>
							</div>
						</div>
					</div>

					<div className="row align-items-center justify-content-between">
						{newBuy.map((item)=> (
							<div className="col-lg-5 col-sm-6" key={item.product_id}>
								<div className="single_feature_post_text">
									<a className="feature_btn" href={`/products/detail/${item.product_id}`}>
										상품 상세 <i className="fas fa-play"></i>
									</a>
									<h4>{item.title}</h4>
									<img src={`http://localhost:8000/upload/${item.picture}`} alt="" style={{height:'280px'}} />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* <!-- feature_part1 end--> */}

			{/* <!-- feature_part2 start--> */}
			<section className="feature_part padding_top">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-12">
							<div className="section_tittle text-center">
								<h2>
									Auction buy <br />
								</h2>
								<h5>최신 입찰 상품</h5>
							</div>
						</div>
					</div>
					<div className="row align-items-center justify-content-between">
						{auctionBuy.map((item) => (
							<div className="col-lg-5 col-sm-6" key={item.auction_id}>
								<div className="single_feature_post_text">
									<a className="feature_btn" href={`/products/detail/${item.product_id}`}>
										상품 상세 <i className="fas fa-play"></i>
									</a>
									<h4>{item.title}</h4>
									<p>입찰가: {item.auction_price}</p>
									<img src={`http://localhost:8000/upload/${item.picture}`} alt="" style={{height:'280px'}} />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
			{/* <!--feature_part2 end--> */}
		</div>
	);
};

export default Home;