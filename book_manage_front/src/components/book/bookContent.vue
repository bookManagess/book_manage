<template>
  <a-table :columns="columns" :data-source="data" :pagination="ipagination" @change="pageChange" bordered :rowKey="record=>record._id">
    <template
      v-for="col in [ '_id','name','author','type','number']"
      :slot="col"
      slot-scope="text"
    >
      <div :key="col">
        <template >
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text,record" >
      <div class="editable-row-operations">
         <span >
          <a  @click="edit(record)">编辑</a>
         </span>
         <a-modal v-model="visible" title="编辑图书" ok-text="确认" cancel-text="取消" @ok="() =>editbook(record)">
         <br />
         <a-input placeholder="" addonBefore="编号:" v-model="id" />
         <br />
         <br />
         <a-input placeholder="" addonBefore="书名:" v-model="name" />
         <br />
         <br />
         <a-input placeholder="" addonBefore="作者:" v-model="author" />
         <br />
         <br />
         <a-input placeholder="" addonBefore="类型:" v-model="type" />
         <br />
         <br />
         <a-input placeholder="" addonBefore="数量:" v-model="number"/>
         <br />
         <br />
         <p  style="font-size:18px;color:red">{{errormessage}}</p>
         </a-modal>
        <span>
          <a-popconfirm
          v-if="data.length"
          title="确定要下架这本书吗?"
          @confirm="() => onDelete(record)"
        >
          <a :disabled="editingKey !== ''" >下架</a>
        </a-popconfirm>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const columns = [
  {
    title: '编号',
    dataIndex: '_id',
    width: '15%',
    scopedSlots: { customRender: '_id' },
    key:'_id',
  },
  {
    title: '书名',
    dataIndex: 'name',
    width: '22%',
    scopedSlots: { customRender: 'name' },
    key:'name',
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: '17%',
    scopedSlots: { customRender: 'author' },
    key:'author',
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: '15%',
    scopedSlots: { customRender: 'type' },
    key:'type',
  },
  {
    title: '数量',
    dataIndex: 'number',
    width: '10%',
    scopedSlots: { customRender: 'number' },
    key:'number',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    width: '20%',
    scopedSlots: { customRender: 'operation' },
  },
];

const data = [];
// for (let i = 0; i < 50; i++) {
//   data.push({
//     key: i,
//     number:`12345678${i}`,
//     bookname:'百年孤独',
//     writor:'加西亚·马尔克斯',
//     type:'魔幻现实主义',
//     booknumber:'8',
//   });
// }
import { mapState } from "vuex";
import { request } from "../../api/index";
export default {
    computed: {
    // 记录即时显示
    ...mapState({
      bookshow: (state) => state.bookshow,
      booksearch: (state) => state.booksearch,
      booklength: (state) => state.booklength,
      newbookdata: (state) => state.newbookdata,
    }),
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data:[],
      visible : false,
      columns,
      id:'',
      name:'',
      author:'',
      type:'',
      number:'',
      editingKey: '',
      errormessage:'',
      ipagination: {
        current: 1,
        pageSize: 5,
        total: data.length,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage:true, // 少于一页时隐藏分页
        pageSizeOptions: ['5','10','15'],  //这里注意只能是字符串，不能是数字
        showTotal: (total, range) => `显示${range[0]}-${range[1]}条，共有 ${total}条`
        },
    };
  },
  mounted(){
    this.$store.commit("change_bookshow", "all");
    this.$store.commit("booksearch", "");
    this.$store.commit("booklength", this.data.length);
  },
  created() {
    this.$store.commit("newbookdata",0);
    console.log(this.newbookdata);
    console.log(this.bookshow);
    request({
      url: "/book/showbook",
      method: "get",
      params: {
        type: this.bookshow,
      },
    })
      .then((res) => {
        console.log(res);
        this.data = res.data.book;
        console.log(this.data.book);
        this.$store.commit("booklength", this.data.length);
        console.log(this.booklength);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  watch: {
     bookshow(val) {
      console.log(this.bookshow);
      request({
        url: "/book/showbook",
        method: "get",
        params: {
          type: this.bookshow,
        },
      })
        .then((res) => {
        console.log(res);
        this.data = res.data.book;
        console.log(this.data.book);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    newbookdata(val) {
      console.log(this.newbookdata);
      request({
        url: "/book/showbook",
        method: "get",
        params: {
          type: this.bookshow,
        },
      })
        .then((res) => {
        console.log(res);
        this.data = res.data.book;
        console.log(this.data.book);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    booksearch(val){
      console.log(this.booksearch);
      request({
        url: "/book/findbook",
        method: "post",
        data: {
          rough_word: val,
        },
      })
        .then((res) => {
          this.data = res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    numberbook(){
      console.log(this.data.length);
      this.$store.commit("booklength", this.data.length);
      console.log(this.booklength);
    },
    pageChange(page, pageSize) {
      this.ipagination.current = page.current;
      this.ipagination.pageSize = page.pageSize;
    },
    edit(record) {
      this.id = "";
      console.log(this.id);
      this.visible = true;
      this.id = record._id;
      console.log(this.id);
      this.name =  record.name;
      this.author =  record.author;
      this.type =  record.type;
      this.number =  record.number;
    },
    editbook(record){
      this.visible = false;
      request({
      url: "/book/update/"+this.id,
      method: "patch",
      data : {
        name:  this.name,
        author:  this.author,
        type: this.type,
        number:  this.number,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
       request({
        url: "/book/showbook",
        method: "get",
        params: {
          type: this.bookshow,
        },
      })
        .then((res) => {
        console.log(res);
        this.data = res.data.book;
        console.log(this.data.book);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onDelete(record) {
      console.log(record._id);
      request({
      url: "/book/deleteBook",
      method: "post",
      data: {
        _id: record._id,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
      console.log(this.bookshow);
      request({
        url: "/book/showbook",
        method: "get",
        params: {
          type: this.bookshow,
        },
      })
        .then((res) => {
        console.log(res);
        this.data = res.data.book;
        console.log(this.data.book);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
