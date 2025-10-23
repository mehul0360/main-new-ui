import { h } from 'vue';

const UsersIcon = ({ stroke = '#4A5565' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', {
        d: 'M13.3333 17.5V15.8333C13.3333 14.9493 12.9821 14.1014 12.357 13.4763C11.7319 12.8512 10.8841 12.5 10 12.5H5C4.11595 12.5 3.2681 12.8512 2.64298 13.4763C2.01786 14.1014 1.66667 14.9493 1.66667 15.8333V17.5',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M7.5 9.16667C9.34095 9.16667 10.8333 7.67428 10.8333 5.83333C10.8333 3.99238 9.34095 2.5 7.5 2.5C5.65905 2.5 4.16667 3.99238 4.16667 5.83333C4.16667 7.67428 5.65905 9.16667 7.5 9.16667Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M18.3333 17.5V15.8333C18.3328 15.0948 18.087 14.3773 17.6345 13.7936C17.182 13.2099 16.5484 12.793 15.8333 12.6083',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M13.3333 2.60833C14.0503 2.79192 14.6859 3.20892 15.1397 3.79359C15.5935 4.37827 15.8399 5.09736 15.8399 5.8375C15.8399 6.57764 15.5935 7.29673 15.1397 7.88141C14.6859 8.46608 14.0503 8.88308 13.3333 9.06667',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    })
]);

export default UsersIcon;
