import React, { Component } from 'react';
import {connect} from 'react-redux';

require('./Home.less');

export default class VideoPagination  extends Component{

	componentWillMount(){
        
	}

	componentDidUpdate(){

	}

	render(){

		return (
            <div className="video-pagination">
                <video src="">您的浏览器不支持视频播放，请更换浏览器再次尝试！</video>
            </div>
		)
	}
}