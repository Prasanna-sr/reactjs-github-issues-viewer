var React = require('react');
var issuesListStore = require('./../store/issuesListStore.js')();
var Pagination = require('./Pagination.react.js');
var IssueItem = require('./IssueItem.react.js');

var IssuesList = React.createClass({
    getInitialState: function() {
        return {
            issuesList: [],
            paging: {}
        };
    },
    componentWillMount: function() {
        var that = this;
        issuesListStore.getList(function(data) {
            if(that.isMounted()) {
                that.setState({
                    issuesList: data,
                    paging: data.paging
                });
            }
        });
    },
   render: function() {
      var list = this.state.issuesList.map(function(issue) {
         return (<IssueItem issues={issue} key={issue.id}/>);
      });
      return (
          <div className="issuesList">
              <ul>
                  {list}
              </ul>
              <Pagination paging={this.state.paging}/>
          </div>
      )
   }
});

module.exports = IssuesList;
