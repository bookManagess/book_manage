import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录信息
    login_name: "",
    login_password: "",
    login_phone: "",
    // 图书显示信息
    bookshow: "all",//all,science,sword
    // 借书记录显示信息
    bookrecordshow: 'search',//search:所有记录,return:仅还书记录
    //显示给管理员的借书记录 
    mbookrecordshow:0,//0:未批准的借书记录 1:同意的借书记录 2:驳回的借书记录
  },
  mutations: {
    //存储登录信息
    store_login_message(state,login) {
      state.login_name = login[0]
      state.login_password = login[1]
      state.login_phone = login[2]
    },
    // 图书显示状态
    change_bookshow(state,bookshow) {
      state.bookshow = bookshow
    },
    change_bookrecordshow(state,bookrecordshow) {
      state.bookrecordshow = bookrecordshow
    },
    change_mbookrecordshow(state,mbookrecordshow){
      state.mbookrecordshow=mbookrecordshow
    }
  },
  actions: {
  },
  modules: {
  }
})
