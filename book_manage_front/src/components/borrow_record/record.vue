<template>
<div>
  <br/>
    <!--
    <a-auto-complete
      class="search_text"
      v-model="value"
      style="width: 200px"
      placeholder="请输入想要查看的内容"
      auto-focus
    />-->
  <a-input-search class="search_text" placeholder="请输入想要查看的内容" style="width: 200px"/>
  <br/>
  <div>
    <a-table class="record_table" :columns="columns" :data-source="data" :pagination="ipagination" @change="pageChange" bordered>
      <span slot="action" >
        <a-button type="primary">
          同意
        </a-button>
        <a-divider type="vertical" />
        <a-button type="danger">
          驳回
        </a-button>
      </span>
    </a-table>
  </div>
</div>
</template>

<script>
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '借书书目',
    dataIndex: 'book',
    key: 'book',
  },
  {
    title: '借书日期',
    dataIndex: 'date',
    key: 'date',
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
    name: '啦啦',
    book:'《史记》',
    date: '2021-1-19',
  },
  {
    key: '2',
    name: '依依',
    book:'《追风筝的人》',
    date: '2021-1-18',
  },
  {
    key: '3',
    name: '玲玲',
    book:'《从你的全世界路过》',
    date: '2021-1-10',
  },
];


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
          hideOnSinglePage:true, // 少于一页时隐藏分页
          pageSizeOptions: ['5','10','15'],  //这里注意只能是字符串，不能是数字
          showTotal: (total, range) => `显示${range[0]}-${range[1]}条，共有 ${total}条`
        }
    };
  },
  methods:{
    pageChange(page, pageSize) {
      this.ipagination.current = page.current;
      this.ipagination.pageSize = page.pageSize;
    },
  }
};

</script>

<style scoped>
  /*
  .book_search {
    display: flex;
    justify-content: center;
  }-->
  */
  .search_text {
    margin: 0px 43% 20px ;
  }
  .record_table {
    margin-right: 8%;
    margin-left: 8%;
  }
</style>
