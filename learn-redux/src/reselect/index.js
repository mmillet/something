import { createSelector } from 'reselect'

const shopItemsSelector = state => state.items;
const taxPercentSelector = state => state.taxPercent;

// 计算商品总价
const subtotalSelector = createSelector(
  shopItemsSelector,
  (items) => {
    console.log('计算商品总价');
    return items.reduce((acc, item) => acc + item.value, 0);
  }
);

// 计算税费
const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => {
    console.log('计算税费');
    return subtotal * (taxPercent / 100);
  }
);

// 计算最后商品总价（含税）
export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => {
    console.log('计算最后商品总价（含税）');
    return subtotal + tax;
  }
);

let state = {
  taxPercent: 8,
  items: [
    { name: 'apple', value: 1.20 },
    { name: 'orange', value: 0.95 }
  ]
};

// console.log(subtotalSelector(state)); // 2.15
// console.log(taxSelector(state));      // 0.172
console.log(totalSelector(state)) ;   // 2.322

console.warn('修改税费')
state.taxPercent = 100;
// console.log(subtotalSelector(state)); // 2.15
// console.log(taxSelector(state));      // 0.172
console.log(totalSelector(state));    // 4.3
