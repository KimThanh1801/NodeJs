class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news'); // chắc chắn bạn có file views/news.ejs (hoặc .pug, .hbs tùy engine)
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAILS');
    }
}

module.exports = new NewsController();
