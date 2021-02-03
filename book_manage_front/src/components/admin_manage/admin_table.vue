<template>
<div>

<a-button class="editable-add-btn" @click="handleAdd" >
      添加用户
    </a-button>
    
     <a-auto-complete
        class="search_text"
        style="width: 200px"
        placeholder="请输入想要查看的内容"
        auto-focus
      />
  
  <a-table :columns="columns" :data-source="data"  :pagination="ipagination" bordered >
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
const columns = [
  {
    title:'用户名',
    dataIndex: 'name',
    key: 'name',
  
  },
  {
    title: '密码',
    dataIndex: 'password',
    key: 'password',
  },
   {
    title: '电话号码',
    dataIndex: 'phonenumber',
    key: 'phonenumber',
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

const data = [
  {
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
  }

export default {
  data() {
    return {
      data,
      columns,
      ipagination: {
          current: 1,
          pageSize: 5,
          total: data.length,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['5','10','15'],  //这里注意只能是字符串，不能是数字
          showTotal: (total, range) => `显示${range[0]}-${range[1]}条，共有 ${total}条`
        }
    };
  },
  methods:{
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
  margin-bottom: 8px;
}
</style>