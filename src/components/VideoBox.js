import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactPaginate from 'react-paginate';
import axios from 'axios'

require('./VideoBox.less');

export default class VideoBox  extends Component{

    constructor(props) {
        super()
        this.state = {
            movieArr:[]
        }
    }

	componentWillMount(){

        this.fetchMovie();

    }
    
    fetchMovie = (page = 0)=>{

            axios.get(`http://192.168.0.103:8001/?page=${page}`)
            .then( (response)=> response.data)
            .then((res)=>{
                this.setState({
                    movieArr:res.movieArr,
                    count:res.count,
                    pages:res.pages
                })
            })
            .catch(function (error) {
                console.log(error);
            })
        
    }

	componentDidUpdate(){

    }

    handlePageClick = (data)=>{
        let selected = data.selected;
        this.fetchMovie(selected)
        this.refs.videolistbox.scrollTop = 0;
    }

    movieListHandle = (e)=>{
        const src = e.target.getAttribute('src');
        this.refs.topvideo.setAttribute('src',src);
        this.refs.topvideo.play()
        this.refs.videolistbox.scrollTop = 0;

    }

	render(){
        let {
            movieArr,
            count,
            pages
        } = this.state;
        console.log(movieArr)
        
		return (
            <div className="videobox"  ref="videolistbox">
                <video ref = "topvideo" autoplay controls preload src="">您的浏览器不支持视频播放，请更换浏览器再次尝试！</video>
                <div className="video-list-box clearfix">
                    {movieArr.map((item,index)=>{
                        return (
                            <div className="videobox-item">                
                                <video src={item.url} onClick={this.movieListHandle}>您的浏览器不支持视频播放，请更换浏览器再次尝试！</video>
                            </div>
                        )
                    })}
                    <ReactPaginate previousLabel={"上页"}
                        nextLabel={"下页"}
                        //breakLabel={<a href="">...</a>}
                        breakClassName={"break-me"}
                        pageCount={pages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </div>

            </div>
		)
	}
}