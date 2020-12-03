const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const helmet = require('helmet');
const hpp = require("hpp");
require('dotenv').config();

const pageRouter = require('./routes/page');
const authRouter = require("./routes/auth");
const projectRouter = require('./routes/project');
const techRouter = require("./routes/tech");
const tagRouter = require("./routes/tag");
const { sequelize } = require('./models');
const passportConfig = require("./passport");
const logger = require("./logger");

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

if (process.env.NODE_ENV === 'production') {
    app.use(morgan("combined"));
    app.use(helmet());
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use('/editor', express.static(path.join(__dirname, 'ckeditor')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,  
    }
}

if (process.env.NODE_ENV === 'production') {    // https 적용할 경우(필수 아님)
    sessionOption.proxy = true;
    //sessionOption.cookie.secure = true;
}

app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize()); // req 객체에 passport 설정을 심음
app.use(passport.session());    // req.session 객체에 passport 정보를 저장함

// 라우팅
app.use('/', pageRouter);
app.use('/project', projectRouter);
app.use("/auth", authRouter);
app.use("/tech", techRouter);
app.use("/tag", tagRouter);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    logger.error(err.message);
    next(err);
});

app.use((err,req,res,next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});