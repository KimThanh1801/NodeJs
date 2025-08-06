const express = require('express');
// Import thư viện Express

const morgan = require('morgan');
// Import morgan để log request ra console

const path = require('path');
// Import thư viện path (hỗ trợ xử lý đường dẫn)

const exphbs = require('express-handlebars');
// Import express-handlebars để dùng làm view engine

const methodOverride = require('method-override');

const app = express();
// Khởi tạo app Express
app.use(methodOverride('_method'));
// import route
const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
const port = 3000;
// Định nghĩa port server sẽ chạy
app.use(express.static(path.join(__dirname, 'resource', 'public')));
// Đường dẫn đến folder chứa partials (header, footer,...)
const partialsPath = path.join(
    __dirname,
    'resource',
    'views',
    'layouts',
    'partials',
);
console.log('Partials Path:', partialsPath);
// In ra console để kiểm tra đường dẫn partials

// Cấu hình handlebars
app.engine(
    'hbs',
    exphbs.engine({
        extname: '.hbs',
        partialsDir: partialsPath,
        helpers: {
            sum: (a, b) => {
                return a + b;
            },
        },
    }),
);
app.set('view engine', 'hbs');
// Đặt view engine mặc định là handlebars (.hbs)

app.set('views', path.join(__dirname, 'resource', 'views'));
// Đường dẫn chứa các file views chính (home.hbs, news.hbs,...)
console.log('Views Path:', path.join(__dirname, 'resource', 'views'));
// In ra console để kiểm tra đường dẫn views

app.use(morgan('combined'));
// Sử dụng morgan để log request chi tiết

// Routes init
route(app);

app.get('/', (req, res) => {
    res.render('home');
});
// Route GET / -> render view home.hbs

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
// Khởi động server, lắng nghe tại port 3000
