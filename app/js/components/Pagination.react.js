var React = require('react');
var Pagination = React.createClass({
    render: function() {
        var first = generatePageHref(this.props.paging.first);
        var last = generatePageHref(this.props.paging.last);
        var next = generatePageHref(this.props.paging.next);
        var prev = generatePageHref(this.props.paging.prev);
        return (
        <div className="pagination">
            <a href={prev} className="< previous">previous</a>
            <a href={first} className="first">first</a>
            <a href={last} className="last">last</a>
            <a href={next} className="next >">next</a>
        </div>
        );
    }
});
function generatePageHref(page) {
    return page ? "?page=" + page : "";
}

module.exports = Pagination;
