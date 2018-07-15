import React from 'react'
import { List, InputItem, Grid, NavBar, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import { getChatId } from '../../util';
import QueueAnim from  'rc-queue-anim'

 @connect(
     state=>state,
     { getMsgList, sendMsg, recvMsg, readMsg}
 )
class Chat extends React.Component{
    constructor(props){
        super(props)
        this.handelSubmit = this.handelSubmit.bind(this)
        this.state={
            text:"",
            msg:[]
        }
    }
    fixCarousel(){
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0);
    }
    componentDidMount(){
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg() 
        }
        this.fixCarousel()
    } 
    componentWillUnmount(){
        const to = this.props.match.params.user
        // console.log(to)
        this.props.readMsg(to)
    }
    handelSubmit(){

        const from =this.props.user._id;
        const to =this.props.match.params.user
        const msg =this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({
            text:"",
            showEmoji:false
        })
    }
    render(){
        // console.log(this.props)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))

        const userid = this.props.match.params.user
        const Item =List.Item
        const users =this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const chatid=getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid == chatid)
        return(
            <div id="chat-page">
                <NavBar mode='dark'
                    icon={<Icon type="left" />}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                    
                <QueueAnim delay={100} type="scale">

          
                {chatmsgs.map(v=>{
                    const avatar=require(`../img/${users[v.from].avatar}.png`)
                    return v.from == userid?(
                        <List key={v._id}>
                            <Item 
                                thumb={avatar}
                            >
                                {v.content}
                            </Item>
                        </List>
                      
                    ):(
                        <List key={v._id}>
                            <Item 
                            extra={<img src={avatar} alt="avatar"/>}
                            className="chat-me">
                                    {v.content}
                                </Item>
                            </List>
                       
                    )
                    // return <p key={v._id} > {v.content}</p>
                })}
                </QueueAnim>
                <div className="stick-footer">
                    <List>
                        <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={
                            <div>
                                <span  
                                style={{marginRight:15}}
                                onClick={()=>{
                                    this.setState({
                                        showEmoji: !this.state.showEmoji
                                    })
                                    this.fixCarousel()
                                }}
                                >
                                    😀
                                </span>
                                <span onClick={() => this.handelSubmit()}>发送</span>
                            </div>
                        }
                        >
                     
                        </InputItem> 
                    
                    </List>
                    {this.state.showEmoji && <Grid data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                    text: this.state.text + el.text
                                })
                            console.log(el)
                        }}
                    />}
                 

         
                </div>
        
            </div>
        )
    }
}
export default Chat
