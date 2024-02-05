import React, {useState, useEffect} from 'react'
// import { produce } from 'immer'
import PropTypes from 'prop-types'

// 앱 전역에서 이용할 데이터 공유 객체 context 준비
const UserContext = React.createContext(null)

// 앱전역에서 사용하고자 하는 상태, 상태변경함수 등을 가지는 컴포넌트 선언
export const UserProvider = (props) => {

    //컨텍스트 정보에.. isadmin 정보까지 유지하는게 맞을듯 하여..
    const [userData, setUserData] = useState({email:'', user_name:'', isadmin:'N'})

    useEffect(()=>{
        // console.log('페이지 진입')
        const sessionEmail = sessionStorage.getItem("email")
        const sessionUserName = sessionStorage.getItem("user_name")
        const sessionIsadmin = sessionStorage.getItem("isadmin")
        if (sessionEmail && sessionUserName && sessionIsadmin) {
            // console.log('마이세션', sessionEmail, sessionUserName, sessionIsadmin)
            setUserData({email:sessionEmail, user_name:sessionUserName, isadmin: sessionIsadmin})
        }
    }, [])

    const loginUser = (user) => {
        // immer 사용하는 경우 
        // 상태데이터는 이전 것을 변경하는 것이 아니라, 이전 것을 참조해서 새로운 것을 만듦 => 불변성으로 관리하는 것이 좋다.
        // 이전상태를 복사해서 새로운 것을 만들고, 그 새로운 곳에 추가,제거,수정 등을 한다.
        // 그때 spread operator(...)을 이용해도 되고, immer 라이브러리를 이용해도 된다.
        // const newUserData = produce(userData, (draft) => {
        //     draft.email = user.email
        //     draft.user_name = user.user_name
        // })
        // console.log(11, newUserData)
        // setUserData(newUserData)
        setUserData({email:user.email, user_name:user.user_name, isadmin: user.isadmin})
    }

    const logoutUser = () => {
        setUserData({email:'', user_name:'', isadmin: 'N'})
    }

    // 자신들이 가지고 있는 상태 데이터,상태변경함수 등을 하위에 공개하기 위해서 context에 추가할 정보
    const values = {
        state: {userData},
        action: {loginUser, logoutUser}
    }

    // 이곳에서 가지는 상태 및 상태변경함수등을 준비한 context에 등록
    // 자신의 정보를 하위에 공개하는 리턴
    // props.children에 추가된 모든 하위 컴포넌트가 context에 추가된 정보를 이용할 수 있다.
    return <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext