<script setup lang="ts">
import VirtualScrollList from 'vue3-virtual-scroll-list';
import { computed, ref, toRefs } from 'vue';
import { SidebarConfigs, useSidebar } from './useSidebar';
import { useVirtualList } from './useVirtualList';
import { VirtualProps } from './props';

type PropsType = {
  sidebarConfigs: SidebarConfigs;
  sidebarActiveIndex: number;
  virtualListAttrs: VirtualProps;
  height: number;
};

const props = defineProps<PropsType>();

const emit = defineEmits(['update:sidebarActiveIndex']);

const selfSidebarActiveIndex = computed({
  get() {
    return props.sidebarActiveIndex;
  },
  set(val) {
    emit('update:sidebarActiveIndex', val);
  },
});

const { sidebarConfigs: sc } = toRefs(props);

const scrollListRef = ref();

const { sidebarRef, hanldeSidebarItemClick, bs, scrollToIndex } = useSidebar({
  sidebarConfigs: sc,
  sidebarActiveIndex: selfSidebarActiveIndex,
  scrollListRef,
});

const {
  virtualListBinds,
  style: virtualListStyle,
  handleScroll,
} = useVirtualList({ props, scrollListRef, bs, scrollToIndex });
</script>

<template>
  <div class="vue-virtual-nav-list-wrapper">
    <div
      class="vue-virtual-nav-list-sidebar"
      ref="sidebarRef"
      :style="{
        width: `${sidebarConfigs.sidebarWidth}px`,
        height: `${height}px`,
      }"
    >
      <div class="scroll-content">
        <div
          v-for="(item, index) of sidebarConfigs.data"
          :key="sidebarConfigs.key && item[sidebarConfigs.key] && index"
          @click="(e) => hanldeSidebarItemClick(e, { item, index })"
        >
          <slot name="sidebarItem" :item="item" :index="index"></slot>
        </div>
      </div>
    </div>

    <div class="vue-virtual-nav-list-content">
      <VirtualScrollList
        ref="scrollListRef"
        :style="virtualListStyle"
        v-bind="virtualListBinds"
        @scroll="handleScroll"
      ></VirtualScrollList>
    </div>
  </div>
</template>

<style scoped lang="less">
.vue-virtual-nav-list-wrapper {
  display: flex;
}
.vue-virtual-nav-list-sidebar {
  overflow: hidden;
  height: 400px;
  position: relative;
}

.vue-virtual-nav-list-content {
  flex: 1;
}
</style>
