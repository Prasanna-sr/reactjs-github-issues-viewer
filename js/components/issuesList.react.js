var React = require('react');
var issuesListStore = require('./../store/issuesListStore.js')();

var Issues = React.createClass({
   render: function() {
      return (
         <li>
            <img src={this.props.issues.user.avatar_url}/>
            <div className="heading">
               <label className="name">{this.props.issues.user.login}
                  <span>label</span>
               </label>
               <label className="title">{this.props.issues.title}
                  <span>{this.props.issues.id}</span>
               </label>
            </div>
            <label className="summary">{this.props.issues.body}</label>
         </li>
      );
   }
});

var IssuesList = React.createClass({
    getInitialState: function() {
        return {
            issuesList: []
        };
    },
    componentDidMount: function() {
        var that = this;
        issuesListStore.getList(function(data) {
            console.log('mount 1');
            if(that.isMounted()) {
                console.log('mount');
                that.setState({
                    issuesList: data
                })
            }
        });
    },
   render: function() {
       console.log(this.state.issuesList);
      var list = this.state.issuesList.map(function(issue) {
         return (<Issues issues={issue}/>);
      });
      return (
          <div>
              <ul>
                  {list}
              </ul>
          </div>
      )
   }
});

module.exports = IssuesList;
