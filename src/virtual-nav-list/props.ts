import { Component } from 'vue';
import { SidebarConfigs } from './useSidebar';

export type ItemType = Record<string, any>;

export type VirtualProps = {
  dataKey: string;
  dataSources: ItemType[];
  dataComponent: Component;
  estimateSize: number;
};

export interface PropsType {
  sidebarConfigs: SidebarConfigs;
  sidebarActiveIndex: number;
  virtualListAttrs: VirtualProps;
  height: number;
}
