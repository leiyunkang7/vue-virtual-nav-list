export default {
  name: 'vue-virtual-nav-list',
  build: {
    css: {
      preprocessor: 'less',
    },
    site: {
      publicPath: '/vue-virtual-nav-list/',
    },
  },
  site: {
    title: 'vue-virtual-nav-list',
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
          {
            path: 'quickstart',
            title: '快速上手',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'demo-button',
            title: 'DemoButton 按钮',
          },
          {
            path: 'virtual-nav-list',
            title: '虚拟滚动导航',
          },
        ],
      },
    ],
  },
};
