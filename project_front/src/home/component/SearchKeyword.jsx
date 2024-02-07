import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'

const SearchKeyword = () => {
    // 검색결과 상태데이터
    const [resultList, setResultList] = useState([])

    // navigate에서 넘긴 데이타 받아오기 
    const location = useLocation()
    const result = [ ...location.state ]

    useEffect(()=>{
        // console.log(result)
        setResultList(result)
    }, [location.state])

    return (
        <section className="cart_area" style={{marginTop:'140px'}}>
            <div className="container">
                <div className="col-lg-12">
                    <h3>검색결과 목록</h3>
                </div>
                <div className="cart_inner">
                    <table className="table">
                        <thead className="table-light">
                            <tr>
                                <th scope="col"><strong>product_id</strong></th>
                                <th scope="col"><strong>도서명</strong></th>
                                <th scope="col"><strong>등록이메일</strong></th>
                                <th scope="col"><strong>즉시구매가</strong></th>
                                <th scope="col"><strong>요청사항</strong></th>
                            </tr>
                        </thead>
                        <tbody>
                        {resultList[0] ? (
                            <>
                            {resultList.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.product_id}</td>
                                    <td>
                                        <img src={`http://localhost:8000/static/upload/${item.picture}`} style={{width:'80px'}} />{' '}
                                        <Link to={`/product/detail/${item.product_id}`}>{item.title}</Link>
                                    </td>
                                    <td>{item.email}</td>
                                    <td>{item.master_price}</td>
                                    <td>{item.content}</td>
                                </tr>
                            ))}
                            </>
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">검색 결과가 없습니다</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default SearchKeyword