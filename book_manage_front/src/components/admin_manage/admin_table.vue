<template>
  <div>
    
    <a-button class="editable-add-btn" @click="handleAdd" >
      添加用户
    </a-button>
    <!--
    <a-auto-complete
      class="search_text"
      style="width: 200px"
      placeholder="请输入想要查看的内容"
      auto-focus
    />-->
    <a-input-search class="search_text" placeholder="请输入想要查看的内容" style="width: 200px"/>
  
    <a-table :columns="columns" :data-source="data"  :pagination="ipagination" @change="pageChange" bordered  :rowKey="record=>record._id">
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === '×' ? 'volcano' :  'geekblue' "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" >> 
        <a @click="handleDelete">删除</a>
        <a-divider type="vertical" />
     
        <a @click="handleAlter">编辑</a>
        <a-divider type="vertical" />
      
        <a @click="tagsAlter">修改用户状态</a>
      </span>  
    </a-table>

  </div>
</template>
<script>
import { request } from "../../api/index";

const columns = [
  {
    title:'账号',
    dataIndex: '_id',
    key: '_id',
    // scopedSlots: { customRender: '_id' },
  
  },
  {
    title: '密码',
    dataIndex: 'password',
     key: 'password',
   // scopedSlots: { customRender: 'password' },
    
  },
   {
    title: '电话号码',
    dataIndex: 'phone',
   key: 'phone',
    //scopedSlots: { customRender: 'phone' },
  
  },
  {
    title: '状态',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' },
  },
  {
    title: '操作',
    key: 'action',
   scopedSlots: { customRender: 'action' },
  },
];

const data = [];
 /* {
    key: '1',
    name: '面包',
    password: '111',
    phonenumber:'13456667777',
    tags: ['√'],
  },
  {
    key: '2',
    name: 'sun',
    password: '100',
    phonenumber:'13456667778',
    tags: ['×'],
  },

];
 for (let i = 3; i < 20; i++) {
    data.push({
      key: i,
      name: `面包 ${i}`,
      password: 32,
      phonenumber:'13356667777',
      tags:['√']
    })
  }*/

export default {
  data() {
    return {
      data:[],
      columns,
      ipagination: {
        current: 1,
        pageSize: 5,
        total: data.length,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage:true, // 少于一页时隐藏分页
        pageSizeOptions: ['5','10','15'],  //这里注意只能是字符串，不能是数字
        showTotal: (total, range) => `显示${range[0]}-${range[1]}条，共有 ${total}条`
        }
    };
  },
  created(){
    request({
      url:"/admin/search",
      method:"get"
    }).then((res)=>{
      console.log(res);
      this.data=res.data.message.filter((n)=>n.identify==0);
      console.log(this.data);
    }).catch((err)=>{
      console.log(err);
    });
  },
  methods:{
    pageChange(page, pageSize) {
      this.ipagination.current = page.current;
      this.ipagination.pageSize = page.pageSize;
    },
    handleAdd() {
      console.log('添加用户')
    },
    handleDelete(){
       console.log("删除用户");
    },
    handleAlter(){
        console.log('修改用户信息');
    },
    tagsAlter(){
       console.log('修改用户状态');
    }
  }
};
</script>

<style scoped>
.editable-add-btn {
  margin-bottom:20px;
  margin-top:0px;
}
.search_text {
  margin-top:0px; 
  margin-left:35%;
}
</style>