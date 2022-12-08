import { onMounted, ref, Ref } from 'vue';
import BScroll from '@better-scroll/core';

export type SidebarItem = {
  [x: string]: any;
  anchor: number;
};

export type SidebarConfigs = {
  key: string;
  data: SidebarItem[];
  sidebarWidth: number;
};

export function useSidebar({
  sidebarConfigs,
  sidebarActiveIndex,
  scrollListRef,
}: {
  sidebarConfigs: Ref<SidebarConfigs>;
  sidebarActiveIndex: Ref<number>;
  scrollListRef: Ref<any>;
}) {
  const sidebarRef = ref();

  const bs = ref();

  onMounted(() => {
    bs.value = new BScroll(sidebarRef.value, {
      // ...... 详见配置项
      probeType: 3,
      click: true,
    });
  });

  const scrollToIndex = (index: number) => {
    sidebarActiveIndex.value = index;
    const el = sidebarRef.value.querySelectorAll(`.scroll-content > div`)[
      index
    ];
    el && bs.value.scrollToElement(el, 300, 0, true);
  };

  return {
    sidebarRef,
    bs,
    scrollToIndex,
    hanldeSidebarItemClick(
      e: Event,
      {
        item,
        index,
      }: {
        item: SidebarItem;
        index: number;
      }
    ) {
      sidebarActiveIndex.value = index;
      bs.value.scrollToElement(e.target, 300, 0, true);
      scrollListRef.value.scrollToIndex(item.anchor);
    },
  };
}
