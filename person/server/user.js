const express =require('express')
const utils = require("utility")
const Router =express.Router() 
const model = require('./model')
const User =model.getModel('user')
const Chat = model.getModel('chat')
// Chat.remove({},function (e,d) {
    
// })
const _filter={"pwd":0,"_v":0}
Router.get('/list',function (req,res) {
    const {type}=req.query
 
    User.find({type},function (err,doc) {
        
        return res.json({code:0,data:doc})
    })
    // User.remove({},function (e,d) {     
    // })
})

Router.get('/getmsglist',function (req,res) {
    const user =req.cookies.userid
    let users = {}
    User.find({},function (e,userdoc) {
        userdoc.forEach(v=>{
            users[v._id]={
                name:v.user,
                avatar:v.avatar

            }
        })
    })
    // '$or':[{from:user,to:user}]
    Chat.find({'$or':[{from:user},{to:user}]},function (err,doc) {
        if (!err) {
            return res.json({code:0,msgs:doc,users:users})
        }
    })
})
Router.post("/readmsg",function (req,res) {
    const userid=req.cookies.userid
    const {from}=req.body
    console.log(userid,from);
    Chat.update({from,to:userid},{'$set':{read:true}},
    {'multi':true},
    function (e,d) {
        console.log(d)
        if (!e) {
            return res.json({ code: 0, num:d.nModified})
        }
        return res.json({code:1,msg:"修改失败"})
    })

})
Router.post("/update",function (req,res) {
    const userid=req.cookies.userid
    if (!userid) {
        return res.json({code:1})
    }
    const body=req.body
    User.findByIdAndUpdate(userid,body,function (e,d) {
        const data=Object.assign({},{
            user:d.user,
            type:d.type
        },body)
        return res.json({ code: 0, data })
    })
})
Router.post("/login",function (req,res) {
    const {user,pwd}=req.body
    User.findOne({ user, pwd: md5Pwd(pwd) }, _filter,function (e,d) {
        if (!d) {
            return res.json({code:1,msg:"用户名或密码错误"})
        }
        res.cookie('userid',d._id)
        return res.json({code:0,data:d})
    })
})
Router.post("/register",function(req,res) {
    console.log(req.body);
    const {user,pwd,type}=req.body
    User.findOne({user},function (err,doc) {
        if (doc) {
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel  =new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function (e,d) {
            if (e) {
                return res.json({code:1,msg:"后端出错了"})
            }
            const {user,type,_id} =d;
            res.cookie("userid",_id)
            return res.json({code:0,data:{user,type,_id}})
        })
        // User.create({ user, type, pwd:md5Pwd(pwd)},function (e,d) {
        //     if (e) {
        //         return res.json({code:1,msg:"后端出错了"})
        //     }
        //     return res.json({code:0})
        // })
    })   
})
Router.get('/info',function (req,res) {
    const {userid} =req.cookies    
    if (!userid) {
        return res.json({ code: 1 })
    }
    User.findOne({ _id: userid }, _filter,function (e,d) {
        if (e) {
            return res.json({ code: 1,msg:"后端出错了" }) 
        }
        if (d) {
   
            return res.json({code:0,data:d})
        }
    })
    // 用户有没有cookie 
  
})

function md5Pwd(pwd) {
    const salt="imooc_is_good_39751123dfsad@!!!"
    return utils.md5(utils.md5(pwd + salt)) 
}
module.exports =Router