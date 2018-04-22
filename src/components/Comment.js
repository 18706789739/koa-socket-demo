import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    Editor,
    EditorState , 
    convertFormRaw
   } from 'draft-js';
import {
    addComment
} from '../components/CommentRedux'

require('./Comment.less');

@connect(state => {
	return {
		comments:state.comment.comment.comments
  };
}, {
  addComment
})
export default class Comment extends Component{
    constructor(props) {
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.receiveMessage();
      }

    componentWillMount(){
        
    }

    componentDidUpdate(){
		this.refs.commentBox.scrollTop = this.refs.commentBox.scrollHeight;
	}

    shouldComponentUpdate(props,state){
        return true;
    }

    receiveMessage = () =>{
        global.socket.on('chat message',(res ) => {
            console.log(res)
            this.props.addComment(res)
        })
    }   


    render(){
        const {
            comments
        } = this.props;

        return (
            
            <div className="client-comment-container" ref ="commentBox">
            {comments.map((item,index) => {
                return (
                    <div className="comment-container">
                        <div className="comment-client-photo"><img src="http://www.500113.com/face/p1/null.jpg" alt=""/></div>
                        <div className="comment-client-info">
                            <div className="comment-client-name">{item.clientName}</div>
                            <div className="comment-client-sendtime">{item.sendTime}</div>
                        </div>
                        <div className="comment-client-content">
                        <Editor editorState={item.content} readOnly={true} />
                        </div>
                    </div>
                )
            })}
            </div>
            
        )
    }
}