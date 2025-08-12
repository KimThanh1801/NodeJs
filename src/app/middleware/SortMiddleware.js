module.exports = function SortMiddleware(req, res, next) {
    res.locals._sort = {
        enable: false,
        type: 'default',
        column: null,
    };

    // Kiểm tra đúng tên query `_sort`
    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        res.locals._sort.enable = true;
        res.locals._sort.type = req.query.type || 'default';
        res.locals._sort.column = req.query.column || null;
    }

    next();
};
