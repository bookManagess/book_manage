<template>
<span>
    <a-button id="new" @click="newbook">上架图书</a-button>   
    <a-modal v-model="visible" title="上架图书" ok-text="确认" cancel-text="取消" @ok="bookNew">
       <br />
      <a-input placeholder="" addonBefore="编号:" v-model="id" />
       <br />
       <br />
      <a-input placeholder="" addonBefore="书名:" v-model="name"/>
       <br />
       <br />
       <a-input placeholder="" addonBefore="作者:" v-model="author"/>
       <br />
       <br />
      <a-input placeholder="" addonBefore="类型:" v-model="type"/>
       <br />
       <br />
      <a-input placeholder="" addonBefore="数量:" v-model="number"/>
       <br />
       <br />
      <p  style="font-size:18px;color:red">{{errormessage}}</p>
    </a-modal>
</span>
</template>

<script>
import { request } from "../../api/index";
import { mapState } from "vuex";
export default {
    computed: {
    // 记录即时显示
    ...mapState({
      booklength: (state) => state.booklength,
      newbookdata: (state) => state.newbookdata,
    }),
  },
  data() {
    return {
      visible : false,
      newchange:'0',
      booknumber:'',
      id:'',
      name:'',
      author:'',
      type:'',
      number:'',
      errormessage:''
    };
  },
  created(){
    this.errormessage = ''  //测试
  },
  methods: {
    newbook() {
      this.visible = true;
      this.id = '';
      this.name = '';
      this.author = '';
      this.type = '';
      this.number = '';
    },
    bookNew(){
      this.visible = false; //后面如果上架成功则关闭，否则弹出错误,上架失败请重试
       request({
        url: "/book/insertbook",
        method: "post",
        data: {
          _id:this.id,
          name:this.name,
          author:this.author,
          number:this.number,
          type:this.type
        },
      })
        .then((res) => {
          // this.data = res.data.result;
          console.log(res);
          this.newchange = this.newchange + 1;
          this.$store.commit("newbookdata",this.newchange);
          console.log(this.newbookdata);
        })
        .catch((err) => {
          this.errormessage = err;
          console.log(err);
        });
    }
  },
};
</script>