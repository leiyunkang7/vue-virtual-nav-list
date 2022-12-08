import { computed, Ref } from 'vue';
import { PropsType } from './props';
import { SidebarItem } from './useSidebar';

function findSidebarIndex({
  sidebarData,
  index,
}: {
  sidebarData: SidebarItem[];
  index: number;
}) {
  let sidebarIndex = 0;
  let current: SidebarItem;
  let next: SidebarItem;
  while (sidebarIndex < sidebarData.length) {
    current = sidebarData[sidebarIndex];
    next = sidebarData[sidebarIndex + 1];
    if (!next) {
      break;
    }
    if (current.anchor <= index && index < next.anchor) {
      break;
    }
    sidebarIndex++;
  }

  return sidebarIndex;
}

export function useVirtualList({
  props,
  scrollListRef,
  bs,
  scrollToIndex,
}: {
  props: PropsType;
  scrollListRef: Ref<any>;
  bs: Ref<any>;
  scrollToIndex: (index: number) => void;
}) {
  const virtualListBinds = computed(() => ({
    ...props.virtualListAttrs,
  }));

  const idList = computed(() => {
    const { dataSources, dataKey } = props.virtualListAttrs;

    return dataSources.map((item) => item[dataKey]);
  });

  return {
    virtualListBinds,
    style: computed(() => `height: ${props.height}px; overflow-y: auto;`),
    handleScroll(event: MouseEvent, range: any) {
      const target = event.target as HTMLElement;
      const scrollTop = target?.scrollTop || 0;
      let offset = 0;
      const index = idList.value.findIndex((id) => {
        offset +=
          scrollListRef.value.getSize(id) ||
          props.virtualListAttrs.estimateSize;

        return scrollTop <= offset;
      });

      if (index < 0) {
        return;
      }

      const { sidebarConfigs } = props;
      const { data: sidebarData } = sidebarConfigs;
      const sidebarIndex = findSidebarIndex({
        sidebarData,
        index,
      });

      // console.log(index, sidebarIndex);

      scrollToIndex(sidebarIndex);
    },
  };
}
