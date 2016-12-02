import Vue from 'vue';
import App from 'src/app';

describe('App.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      template: '<div><app></app></div>',
      components: { App }
    }).$mount();
    expect(vm.$el.querySelector('h1').textContent).to.contain('质量监管后台');
    expect(vm.$el.querySelector('p').textContent).to.contain('星数科技产品质量后台管理系统');
  });
});
