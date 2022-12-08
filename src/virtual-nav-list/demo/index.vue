<script setup lang="tsx">
import { Component, markRaw, ref } from 'vue';
import VirTualNavList from '../index.vue';

const sidebarActiveIndex = ref(0);

const sidebarList = [
  {
    label: '优惠',
    value: '1',
    anchor: 0,
  },
  {
    label: '麦麦夜市',
    value: '2',
    anchor: 11,
  },
  {
    label: '欢聚桶/餐',
    value: '3',
    anchor: 21,
  },
  {
    label: '巨无霸/牛鱼肉堡',
    value: '4',
    anchor: 31,
  },
  {
    label: '鸡肉汉堡/卷',
    value: '5',
    anchor: 51,
  },
  {
    label: '安格斯MAX厚牛堡',
    value: '6',
    anchor: 61,
  },
  {
    label: '炸鸡',
    value: '7',
    anchor: 71,
  },
  {
    label: '小食甜品',
    value: '8',
    anchor: 81,
  },
  {
    label: '麦咖啡超值专享',
    value: '9',
    anchor: 91,
  },
  {
    label: '饮品',
    value: '10',
    anchor: 101,
  },
  {
    label: '500大卡套餐',
    value: '11',
    anchor: 111,
  },
  {
    label: '开心乐园餐',
    value: '12',
    anchor: 121,
  },
  {
    label: '商品券核销',
    value: '13',
    anchor: 131,
  },
  {
    label: 'K记饭堂',
    value: '14',
    anchor: 141,
  },
  {
    label: '精选套餐',
    value: '15',
    anchor: 151,
  },
  {
    label: '品牌会员',
    value: '16',
    anchor: 161,
  },
  {
    label: '自在厨房',
    value: '17',
    anchor: 171,
  },
  {
    label: '儿童套餐',
    value: '18',
    anchor: 181,
  },
  {
    label: 'K咖啡',
    value: '19',
    anchor: 191,
  },
  {
    label: '原味鸡/脆皮鸡',
    value: '20',
    anchor: 201,
  },
  {
    label: '灵魂宵夜',
    value: '21',
    anchor: 211,
  },
];

const sidebarConfigs = ref({
  data: sidebarList,
  key: 'value',
  sidebarWidth: 90,
});

const virtualListAttrs = ref({
  dataSources: mockData(),
  dataKey: 'id',
  estimateSize: 90,
  dataComponent: markRaw({
    props: {
      source: Object,
    },
    data() {
      return {};
    },
    render() {
      const source: Item = this.source;
      const { img, description, name } = source;
      return (
        <div class="item-wrapper">
          <div class="item">
            <img src={img}></img>
            <div class="item-content">
              <div class="item-name">{name}</div>
              <div class="item-description">{description}</div>
            </div>
          </div>
        </div>
      );
    },
  }) as Component,
});

type Item = {
  name: string;
  id: number;
  description: string;
  img: string;
};

function mockData(size = 300) {
  const list: Item[] = [];
  let index = 0;
  while (index < size) {
    list.push({
      name: `双层鳕鱼堡数薯翅四件套${index}`,
      id: index,
      description: '双层深海鳕鱼汉堡1个+麦辣鸡翅2块+中薯条1份+中可乐1杯',
      img: 'https://qcloud.dpfile.com/pc/ebSHvdbcDCbPgElS8m4rfmPs70ga6UYMhVfy6pg9gfyJnJeEBTbmMVWW6d-43xhFNZvK3RMEnSZusP-oHmeixOpEuctC7NDQ04iV_zcg7BUYPeq-iX-oD-RLc_uA0GHhp6cjSpPcu-UE8TQHZIi94A.jpg',
    });
    index++;
  }

  return list;
}
</script>

<template>
  <demo-block title="基础用法">
    <VirTualNavList
      :sidebar-configs="sidebarConfigs"
      v-model:sidebar-active-index="sidebarActiveIndex"
      :virtual-list-attrs="virtualListAttrs"
      :height="500"
    >
      <template #sidebarItem="{ item, index }">
        <div class="sidebar-item">
          <div
            class="lable"
            :class="{ isActive: index === sidebarActiveIndex }"
          >
            {{ item.label }}
          </div>
        </div>
      </template>
    </VirTualNavList>
  </demo-block>
</template>

<style lang="less">
.sidebar-item {
  line-height: 30px;
  .isActive {
    color: rgb(76, 0, 255);
    background-color: aquamarine;
  }
}

.item-wrapper {
  height: 90px;
  padding: 4px 8px;
  overflow: hidden;
  box-sizing: border-box;
  .item {
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .item-content {
    flex: 1;
  }
}
</style>
