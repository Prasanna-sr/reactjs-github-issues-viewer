var React = require('react');
var issuesListStore = require('./../store/issuesListStore.js')();
var Issues = React.createClass({
    getInitialState: function() {
        return {
            summary: ''
        };
    },
    componentDidMount: function() {
        this.setState({summary : getSummary(this.props.issues.body)});
    },

   render: function() {
      return (
         <li>
            <img src={this.props.issues.user.avatar_url}/>
            <div className="heading">
               <label className="name">{this.props.issues.user.login}
                      {this.props.issues.labels.map(function(labelObj){
                          var labelStyle = {"background-color": "#" + labelObj.color};
                        return <span className="label" style={labelStyle}>{labelObj.name}</span>
                      })}
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
            if(that.isMounted()) {
                that.setState({
                    issuesList: data
                })
            }
        });
    },
   render: function() {
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
