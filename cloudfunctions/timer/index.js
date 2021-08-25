// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {

  try {
    return await db.collection('Student').where({
      all: null
    })
    .update({
      data: {
        qiandao:{isqiandao:false, isovertem:false,isache:false,isarea:false,Location:{province:'',city:'',district:''},time:'',date:''},
        goout:{isgoout:0,gooutLocation:'',gooutDetailLocation:'',godates:'',gotimes:'',returndates:'',returntimes:'',time:'',reason:'',date:''}
      },
    })
  } catch(e) {
    console.error(e)
  }
 
}