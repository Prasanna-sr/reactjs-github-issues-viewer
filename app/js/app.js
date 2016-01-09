var React = require('react');
var ReactDOM = require('react-dom');
var IssuesList = require('./components/issuesList.react');
ReactDOM.render(
  <IssuesList />,
  document.getElementById('issues-list')
);
