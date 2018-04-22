import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import { push } from 'react-router-redux';

import  MemberList from '../components/MemberList';
import RichEditor from '../share/RichEditor';
import Comment from '../components/Comment'
import {
    addComment
} from '../components/CommentRedux'
import VideoBox from '../components/VideoBox'

require('./Home.less');

@connect(state => {
	return {

  };
}, {
  push,

})
export default class Home  extends Component{

	componentWillMount(){
        global.socket =  io('http://192.168.0.103:3001');
	}

	componentDidUpdate(){
		this.refs.commentBox.scrollTop = this.refs.commentBox.scrollHeight;
	}

	render(){

		return (
			<div className="main-home">
					<div className="main-header">

					</div>
					<div className="main-content">
                        <div className="main-leftbox">
						    <MemberList />
                        </div>
                        <div className="main-middlebox">
                            
                            <Comment  />

							<div className="main-client-comment-editor">
								<RichEditor />
							</div>
                        </div>
                        <div className="main-rightbox">
						<VideoBox />
                        </div>
					</div>
			</div>
		)
	}
}