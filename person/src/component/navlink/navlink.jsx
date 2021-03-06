import React from 'react';
import propTypes from 'prop-types'
import { TabBar } from 'antd-mobile';
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter
@connect(
    state=>state.chat,

)
class NavLinkBar extends React.Component{
static propTypes={
    data: propTypes.array.isRequired
}

render(){
    // console.log("1", this.props.data)
    const navList =this.props.data.filter(v=>!v.hide  )
    // console.log(navList)
    const {pathname} =this.props.location
    return(
      <div>
            <TabBar>
                {navList.map(v=>(
                    <TabBar.Item
                        badge={v.path == '/msg' ? (this.props.unread):""}
                        
                        key={v.path}
                        title={v.text}
                        icon={{
                            uri: require(`./img/${v.icon}.png`)
                        }}
                        selectedIcon={{
                            uri: require(`./img/${v.icon}-active.png`)
                        }}
                        selected={
                            pathname===v.path
                        }
                        onPress={()=>{
                            this.props.history.push(v.path)
                        }}

                    >
                     
                    </TabBar.Item>
                ))}
            </TabBar>
      </div>
    )
}
}
export default NavLinkBar