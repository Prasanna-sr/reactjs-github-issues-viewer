var React = require('react');
var ReactDOM = require('react-dom');
var IssuesList = require('./components/IssuesList.react');
var IssuesDetails = require('./components/IssuesDetails.react');

var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link


ReactDOM.render((
     <Router>
         <Route path="/" component={IssuesList} />
         <Route path="/issues/:id" component={IssuesDetails} />
    </Router>
), document.getElementById('issues-list'))


// ReactDOM.render(
//   <IssuesList />,
//   document.getElementById('issues-list')
// );
