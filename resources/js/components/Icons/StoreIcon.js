import { h } from 'vue';

const StoreIcon = ({ stroke = '#4A5565' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', {
        d: 'M18.3333 6.95833V16.6667C18.3333 17.1087 18.1577 17.5326 17.8452 17.8452C17.5326 18.1577 17.1087 18.3333 16.6667 18.3333H3.33333C2.89131 18.3333 2.46738 18.1577 2.15482 17.8452C1.84226 17.5326 1.66667 17.1087 1.66667 16.6667V6.95833C1.66801 6.62596 1.7687 6.30157 1.9558 6.02686C2.14291 5.75214 2.40787 5.53964 2.71667 5.41667L9.38333 2.75C9.77932 2.59229 10.2207 2.59229 10.6167 2.75L17.2833 5.41667C17.5921 5.53964 17.8571 5.75214 18.0442 6.02686C18.2313 6.30157 18.332 6.62596 18.3333 6.95833Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', { d: 'M5 15H15', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'M5 11.6667H15', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'M15 8.33333H5V18.3333H15V8.33333Z', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
]);

export default StoreIcon;
