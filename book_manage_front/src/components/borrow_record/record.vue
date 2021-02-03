<template>
<div>
   <br/>
   <div class="book_search">
      <a-auto-complete
        class="search_text"
        v-model="value"
        style="width: 200px"
        placeholder="请输入想要查看的内容"
        auto-focus
      />
    </div>
    <br/>
    <div>
    <a-table :columns="columns" :data-source="data">
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
    date: '2021-1-19',
  },
];


export default {
  data() {
    return {
      data,
      columns,
    };
  },
};

</script>

<style scoped>
.book_search {
  display: flex;
  justify-content: center;
}
</style>
