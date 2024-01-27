import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserMain from './user/UserMain'
import HomeMain from './home/HomeMain'

const App = () => {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<HomeMain />} />
                    <Route path='/user/*' element={<UserMain />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App
