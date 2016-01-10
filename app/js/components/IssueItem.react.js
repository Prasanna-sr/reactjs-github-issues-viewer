var React = require('react');

var IssueItem = React.createClass({
   render: function() {
       var summary = getSummary(this.props.issues.body);
      return (
         <li>
            <img src={this.props.issues.user.avatar_url}/>
            <div className="heading">
               <label className="name">{this.props.issues.user.login}
                      {this.props.issues.labels.map(function(labelObj){
                          var labelStyle = {"backgroundColor": "#" + labelObj.color};
                        return <span key={labelObj.name} className="label" style={labelStyle}>{labelObj.name}</span>
                      })}
               </label>
               <label className="title">{this.props.issues.title}
                  <span className="id">#{this.props.issues.id}</span>
               </label>
            </div>
            <label className="summary">{summary}</label>
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

module.exports = IssueItem;
