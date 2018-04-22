import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
    updataClientInfo
} from './MemberListRedux'

require('./MemberList.less');

@connect(state => {
	return {
        clientList:state.client.client.clientList
  };
}, {
    updataClientInfo,
})
export default class MemberList extends Component{
    
        componentWillMount(){
            global.socket.on('client updata',(res ) => {
                console.log(res)
                this.props.updataClientInfo(res)
            })
        }
    
        render(){

            const clients = this.props.clientList

            return (
                <div className="member-list">
                    <div className="member-list-filter">
                        <div className="member-list-filter-item">在线会员({clients.length})</div>
                        <div className="member-list-filter-item">客服/管理(0)</div>
                    </div>
                    <div className="member-list-search">
                        <input className="member-list-search-input" type="text"/>
                    </div>
                    <div className="member-list-item-content">
                    {
                        clients.map((item,index)=>{
                            return (
                                <div className="member-list-item">
                                    {item}
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            )
        }
    }