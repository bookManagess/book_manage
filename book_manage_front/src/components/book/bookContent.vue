<template>
  <a-table :columns="columns" :data-source="data" bordered :rowKey="record=>record.id">
    <template
      v-for="col in [ 'name', 'author','type','number']"
      :slot="col"
      slot-scope="text, record,"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span>
          <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm title="确定取消吗?" @confirm="() => cancel(record.key)">
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)">编辑</a>
        </span>
        <span>
          <a :disabled="editingKey !== ''" >详情</a>
        </span>
        <span>
          <a-popconfirm
          v-if="data.length"
          title="确定要下架这本书吗?"
          @confirm="() => onDelete(record.key)"
        >
          <a :disabled="editingKey !== ''" >下架</a>
        </a-popconfirm>
        </span>
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
  },
  {
    title: '书名',
    dataIndex: 'name',
    width: '22%',
    scopedSlots: { customRender: 'name' },
  },
  {
    title: '作者',
    dataIndex: 'author',
    width: '17%',
    scopedSlots: { customRender: 'author' },
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: '15%',
    scopedSlots: { customRender: 'type' },
  },
  {
    title: '数量',
    dataIndex: 'number',
    width: '10%',
    scopedSlots: { customRender: 'number' },
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
    }),
  },
  data() {
    this.cacheData = data.map(item => ({ ...item }));
    return {
      data:[],
      columns,
      editingKey: '',
    };
  },
  mounted() {
    request({
      url: "/book/showbook",
      method: "get",
      params: {
        type: 'all',
      },
    })
      .then((res) => {
        console.log(res)
        this.data = res.data.book;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    edit(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.data = newData;
      }
    },
    save(key) {
      const newData = [...this.data];
      const newCacheData = [...this.cacheData];
      const target = newData.filter(item => key === item.key)[0];
      const targetCache = newCacheData.filter(item => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.data = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = '';
    },
    onDelete(key) {
      const dataSource = [...this.data];
      this.data = dataSource.filter(item => item.key !== key);
    },
    cancel(key) {
      const newData = [...this.data];
      const target = newData.filter(item => key === item.key)[0];
      this.editingKey = '';
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.data = newData;
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
