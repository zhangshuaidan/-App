import React from "react";
import { Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
    static propTypes={
        selectAvatar: PropTypes.func.isRequired
    }
    constructor(props){
        super(props)
        this.state ={}
    }
    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
        .split(",")
        .map(v=>({
            icon:require(`../img/${v}.png`),
            text:v
        }))
        const gridHeader = this.state.icon?(<div>
        <span>已选择头像</span> <img style={{width:20}} alt="123" src={this.state.icon}/>
    </div>):<div>请选择头像</div>
        return (
            <div>
                {/* <gridHeader/> */}
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList}
                        columnNum={5}
                        onClick={e => {
                            this.setState(e)
                            this.props.selectAvatar(e.text)
                        }}
                    />
                </List>
             
            </div>

        )
    }

}
export default AvatarSelector