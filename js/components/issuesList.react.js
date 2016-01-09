var React = require('react');
var issuesListStore = require('./../store/issuesListStore.js')();

var Issues = React.createClass({
    getInitialState: function() {
        return {
            summary: '',
            label: ''
        };
    },
    componentDidMount: function() {
        this.setState({summary : getSummary(this.props.issues.body),
        label: getLabels(this.props.issues.labels)});
    },

   render: function() {
      return (
         <li>
            <img src={this.props.issues.user.avatar_url}/>
            <div className="heading">
               <label className="name">{this.props.issues.user.login}
                  <span className="label">label</span>
               </label>
               <label className="title">{this.props.issues.title}
                  <span className="id">#{this.props.issues.id}</span>
               </label>
            </div>
            <label className="summary">{this.state.summary}</label>
         </li>
      );
   }
});

function getSummary(str) {
    var maxCharacters = 140;
    var briefSummary = str.substring(0, maxCharacters);
    while(briefSummary[maxCharacters] && briefSummary[maxCharacters] !== ' ') {
        maxCharacters --;
    }
    return briefSummary.substring(0, maxCharacters);
}
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
