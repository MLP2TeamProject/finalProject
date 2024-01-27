//초기 설정
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const nunjucks = require('nunjucks')
// 세션 관련 
const cookieParser = require('cookie-parser')
const session = require('express-session')

// 프로젝트 루트에 .env 파일을 이용하겠다. .env를 다른폴더에서 사용하려면 config(매개변수)에 지정
require('dotenv').config()

const homeRouter = require('./home/homeRouter')
const boardRouter = require('./board/boardRouter')
const userRouter = require('./user/userRouter')
const productRouter = require('./product/productRouter')
const auctionRouter = require('./auction/auctionRouter')

const app = express()

// nunjucks 등록 및 설정
app.set('view engine', 'html')
nunjucks.configure('common/views', {
    express: app,
    watch: true
})

app.use(morgan('dev'))
// app.use(cors())
// 세션 관련 
app.use(cors({
    origin: "http://localhost:5173",//front 
    credentials: true,
}))

app.use(express.static(path.join(__dirname, 'public')))

// 세션관련
app.use(cookieParser('secret@1234'))
app.use(session({
    secret: 'secret@1234',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    }
}))

// 클라이언트 요청 데이터, 응답 데이터를 위해서 등록
app.use(express.json())
app.use(express.urlencoded({extended: true})) //http요청의 body parser(즉 form post요청 => request body에 인코딩된 데이터를 해석하여 req.body에 넣음)

// 개발자가 각 파일로 분리시킨 라우터 등록
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/', homeRouter)
<<<<<<< HEAD
app.use('/boards', boardRouter)
=======
app.use('/users', userRouter)
app.use('/product', productRouter)
app.use('/auction', auctionRouter)

>>>>>>> 54fad11 (마이페이지 브랜치 커밋 완료)

// 위에서 안걸린 요청은 404로 처리
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404
    // 에러발생, 아래의 미들웨어가 처리함
    next(error)
})

// error handler middleware
app.use((err, req, res, next) => {
    res.locals.message = err.message
    res.locals.error = process.env.NODE_ENV != 'production' ? err : {}
    res.status(err.status || 500)
    res.render('error') //error.html
})

app.listen(8000, () => {
    console.log('8000번 포트에서 대기중...')
})
