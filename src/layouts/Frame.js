import React from 'react';

require('./Frame.less')

class Frame extends React.Component {
  render() {
    return (
        <div className="fremacontainer">
        	{this.props.children}
        </div>
    );
  }
}

export default Frame;
