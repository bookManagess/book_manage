<template>
  <div>
    <div class="admin-search">
    <a-input-search class="search_text" placeholder="请输入想要查看的内容" style="width: 200px" @search="onSearch"/>
    </div>
    <div class="admin-table">
    <a-table 
    :columns="columns" 
    :data-source="data"  
    :pagination="ipagination"
     @change="pageChange" 
     bordered  
     :rowKey="record=>record._id"
     :loadind="loading">
       <template slot="status" slot-scope="status">
         <a-tag color="green" v-if="status=='using'">已启用</a-tag>
         <a-tag color="red" v-else>已禁用</a-tag>
      </template>

      <template slot="password" slot-scope="text,record,index">
        <div v-if="editForm.editIndex===index">
          <a-input v-model="editForm.editDictPassword"/>
        </div>
        <template v-else>{{text}}</template>
      </template>
      <template slot="phone" slot-scope="text,record,index">
        <div v-if="editForm.editIndex===index">
          <a-input v-model="editForm.editDictPhone"/>
        </div>
        <template v-else>{{text}}</template>
      </template>

      <template slot="action" slot-scope="text,record,index"> 
        <div v-if="editForm.editIndex===-1||editForm.editIndex!==index">
        <a @click="handleEdit(record,index)" >编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm v-if="record.status=='forbid'" title="是否启用当前用户？" ok-text="确认" cancel-text="取消" @confirm="()=>enableUser(record)" >
            <a>修改用户状态</a>
        </a-popconfirm>
        <a-popconfirm v-else title="是否禁用当前用户？" ok-text="确认" cancel-text="取消" @confirm="()=>disableUser(record)" >
            <a>修改用户状态</a>
        </a-popconfirm>
        <a-divider type="vertical" />
        <a-popconfirm  title="是否禁用当前用户？" ok-text="确认" cancel-text="取消" @confirm="()=>handleDelete(record)" >
            <a>删除</a>
        </a-popconfirm>
        </div>
        <div  v-if="editForm.editIndex===index">
        <a @click="handleUpdate()"  >保存</a>
         <a-divider type="vertical" />
        <a @click="handleCancel()" >取消</a>
        </div>
        
      </template>  
    </a-table>
    </div>
  </div>
 
</template>
<script>
import axios from 'axios';


import { request } from "../../api/index";

const columns = [
  {
    title:'账号',
    dataIndex: '_id',
    align: 'center',
    width: '20%'
   //scopedSlots: { customRender: '_id' },  账号默认不能修改
  
  },
  {
    title: '密码',
    dataIndex: 'password',
    align: 'center',
   scopedSlots: { customRender: 'password' },
   width: '20%'
    
  },
   {
    title: '电话号码',
    dataIndex: 'phone',
    align: 'center',
    scopedSlots: { customRender: 'phone' },
    width: '20%'
  
  },
  {
    title: '是否启用',
    dataIndex: 'status',
    align: 'center',
    scopedSlots: { customRender: 'status' },
    width: '15%'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
   scopedSlots: { customRender: 'action' },//插槽 
   width: '25%'
  },
];

const data = [];


export default {
  data() {
    return {
      editForm:{   //编辑表格
        editIndex:-1,
        editId:'',
        editDictPassword:'',
        editDictPhone:'',
        editStatus:''
      },
      data:[],
      columns,
      loading:false,
      ipagination: {
        current: 1,
        pageSize: 3,
        total: data.length,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage:true, // 少于一页时隐藏分页
        pageSizeOptions: ['5','10','15'],  //这里注意只能是字符串，不能是数字
        showTotal: (total, range) => `显示${range[0]}-${range[1]}条，共有 ${total}条`
        }
    };
  },
  mounted(){
    this.initTable();
  },
  methods:{
    initTable(){
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
    pageChange(page, pageSize) {
      this.ipagination.current = page.current;
      this.ipagination.pageSize = page.pageSize;
    }, 
    handleDelete(record){
       console.log("删除用户");
       console.log(record._id);
       axios.post('http://localhost/api/admin/delete',{_id:record._id})
       .then(res=>{
         console.log(res);
         this.$message.success('删除成功',1);
         this.initTable();
       }).catch(err=>{
         console.log(err);
         this.$message.error('删除失败',1);
       })
      
    },
    handleEdit(record,index){
        console.log('修改用户信息');
        this.editForm.editIndex=index;
        this.editForm.editId=record._id;
        this.editForm.editDictPassword=record.password;
        this.editForm.editDictPhone=record.phone;
    },
    onSearch(value){
      console.log('查询列表');
    },
    handleCancel(){
      this.editForm.editIndex= -1;
    },
    handleUpdate(){
      request({
         url:"/admin/update/"+this.editForm.editId,
         method:"patch",
         data:{
           password:this.editForm.editDictPassword,
           phone:this.editForm.editDictPhone
         }
      }).then((res)=>{
        this.$message.success('修改成功',1);
        this.initTable();
      }).catch((err)=>{
        console.log(err);
        this.$message.success('修改失败成功',1);
      })
      this.editForm.editIndex= -1;
    },
    enableUser(record){
       request({
         url:"/admin/update/"+record._id,
         method:"patch",
         data:{
           status:'using'
         }
      }).then((res)=>{
        this.$message.success('已启用该用户！',1);
        this.initTable();
      }).catch((err)=>{
        console.log(err);
        this.$message.success('启用用户失败！',1);
      })
    },
    disableUser(record){
        request({
         url:"/admin/update/"+record._id,
         method:"patch",
         data:{
           status:'forbid'
         }
      }).then((res)=>{
        this.$message.success('已禁用该用户！',1);
        this.initTable();
      }).catch((err)=>{
        console.log(err);
        this.$message.success('禁用用户失败！',1);
      })
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
.admin-table{
  margin-top: 20px;
}
</style>