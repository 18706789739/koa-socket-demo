import React from 'react';
import {
   Editor,
   EditorState , 
   getDefaultKeyBinding,
   RichUtils,
   KeyBindingUtil,
   convertToRaw
  } from 'draft-js';

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }


  //回车发送消息
  sendMessage = ()=>{
    console.log('发送数据')
    const content = convertToRaw(this.state.editorState.getCurrentContent());
    global.socket.emit('chat message' , content );
    this.onChange(EditorState.createEmpty());
  }

  //编辑器快捷键
  handleKeyCommand =(command) =>{
    const { editorState } = this.state;
    if (command === 'save') {
      console.log(convertToRaw(editorState.getCurrentContent()));
    } else if (command === 'enter') {
      this.sendMessage()
      console.log(KeyBindingUtil)
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  render() {

    const myKeyBindingFn = (e) => {
      if (e.keyCode === 83 /* `S` key */ && KeyBindingUtil.hasCommandModifier(e)) {
        return 'save';
      }else if (e.keyCode === 13 ){
        return 'enter';
      }
      return getDefaultKeyBinding(e);
    }

    return (
        <Editor editorState={this.state.editorState} 
        onChange={this.onChange}
        keyBindingFn={myKeyBindingFn}
        handleKeyCommand={this.handleKeyCommand}
        />
    );
  }
}

export default RichEditor;