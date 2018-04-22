import { combineReducers } from 'redux';
import {
    convertFromRaw,
    EditorState
} from 'draft-js';

const initialState = {
	comments: [
		// {
		// 	clientName:'',
		// 	sendTime:'',
		// 	content:'',
		// }
	],
}


const ADD_COMMENT = 'ADD_COMMENT';



export function addComment(msg) {
	return {
		type: ADD_COMMENT,
		payload: msg 
	}
}


function comment(state = initialState, action) {
	switch (action.type) {
		case ADD_COMMENT:{
			return {
                ...state,
                comments:state.comments.concat([
                    {
						clientName:action.payload.clientName,
						content:EditorState.createWithContent(convertFromRaw(action.payload.content)),
						sendTime:action.payload.sendTime
					}
                ])
            }
		}
		default:
			return state;
	}
}

/*根据id获取歌曲*/
export const fetchMusic = (id) => dispatch => {
	return fetch('https://api.imjad.cn/cloudmusic/?type=song&id='+id)
	.then(response => response.json())
	.then(json =>{
		json.data[0].url == null && dispatch(setMusicNext());
		dispatch(setMusic(json.data[0]))
	})
}

export default combineReducers({
    comment,
});