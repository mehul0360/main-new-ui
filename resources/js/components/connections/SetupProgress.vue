<script setup>
import { ref, h } from 'vue';
import StepOne from './Steps/StepOne.vue';
import StepTwo from './Steps/StepTwo.vue';
import StepThree from './Steps/StepThree.vue';
import StepFour from './Steps/StepFour.vue';

// Icons as functional components
const ShopifyIcon = ({ stroke = 'white' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', {
        d: 'M5 1.66667L2.5 5V16.6667C2.5 17.1087 2.67559 17.5326 2.98816 17.8452C3.30072 18.1577 3.72464 18.3333 4.16667 18.3333H15.8333C16.2754 18.3333 16.6993 18.1577 17.0118 17.8452C17.3244 17.5326 17.5 17.1087 17.5 16.6667V5L15 1.66667H5Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', { d: 'M2.5 5H17.5', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', {
        d: 'M13.3333 8.33333C13.3333 9.21739 12.9821 10.0652 12.357 10.6904C11.7319 11.3155 10.8841 11.6667 10 11.6667C9.11595 11.6667 8.2681 11.3155 7.64298 10.6904C7.01786 10.0652 6.66667 9.21739 6.66667 8.33333',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    })
]);

const LinkIcon = ({ stroke = '#4A5565' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', {
        d: 'M8.33333 10.8333C8.69121 11.3118 9.1478 11.7077 9.67212 11.9941C10.1965 12.2806 10.7763 12.4509 11.3722 12.4936C11.9682 12.5363 12.5663 12.4503 13.1261 12.2415C13.6859 12.0327 14.1943 11.7059 14.6167 11.2833L17.1167 8.78333C17.8757 7.99749 18.2956 6.94498 18.2861 5.85249C18.2766 4.76001 17.8384 3.71496 17.0659 2.94242C16.2934 2.16989 15.2483 1.73169 14.1558 1.72219C13.0634 1.7127 12.0108 2.13267 11.225 2.89167L9.79167 4.31667',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M11.6667 9.16667C11.3088 8.68823 10.8522 8.29235 10.3279 8.00588C9.80355 7.71942 9.22374 7.54907 8.62779 7.50639C8.03184 7.46371 7.43368 7.54969 6.87388 7.75852C6.31408 7.96734 5.80574 8.29411 5.38333 8.71667L2.88333 11.2167C2.12434 12.0025 1.70436 13.055 1.71386 14.1475C1.72335 15.24 2.16156 16.285 2.93409 17.0576C3.70662 17.8301 4.75168 18.2683 5.84416 18.2778C6.93665 18.2873 7.98916 17.8673 8.775 17.1083L10.2 15.6833',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    })
]);

const PackageIcon = ({ stroke = '#4A5565' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', { d: 'M6.25 3.55833L13.75 7.85', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', {
        d: 'M17.5 6.66667C17.4997 6.3744 17.4225 6.08734 17.2763 5.8343C17.13 5.58126 16.9198 5.37114 16.6667 5.225L10.8333 1.89167C10.58 1.74539 10.2926 1.66838 10 1.66838C9.70744 1.66838 9.42003 1.74539 9.16667 1.89167L3.33333 5.225C3.08022 5.37114 2.86998 5.58126 2.72372 5.8343C2.57745 6.08734 2.5003 6.3744 2.5 6.66667V13.3333C2.5003 13.6256 2.57745 13.9127 2.72372 14.1657C2.86998 14.4187 3.08022 14.6289 3.33333 14.775L9.16667 18.1083C9.42003 18.2546 9.70744 18.3316 10 18.3316C10.2926 18.3316 10.58 18.2546 10.8333 18.1083L16.6667 14.775C16.9198 14.6289 17.13 14.4187 17.2763 14.1657C17.4225 13.9127 17.4997 13.6256 17.5 13.3333V6.66667Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', { d: 'M2.75 5.83333L10 10L17.25 5.83333', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'M10 18.3333V10', stroke, 'stroke-width': '1.66667', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
]);

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

const CartIcon = ({ stroke = '#4A5565' }) => h('svg', {
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg'
}, [
    h('path', {
        d: 'M6.66667 18.3333C7.1269 18.3333 7.5 17.9602 7.5 17.5C7.5 17.0398 7.1269 16.6667 6.66667 16.6667C6.20643 16.6667 5.83333 17.0398 5.83333 17.5C5.83333 17.9602 6.20643 18.3333 6.66667 18.3333Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M15.8333 18.3333C16.2936 18.3333 16.6667 17.9602 16.6667 17.5C16.6667 17.0398 16.2936 16.6667 15.8333 16.6667C15.3731 16.6667 15 17.0398 15 17.5C15 17.9602 15.3731 18.3333 15.8333 18.3333Z',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    }),
    h('path', {
        d: 'M1.70833 1.70833H3.375L5.59167 12.0583C5.67298 12.4374 5.88389 12.7762 6.18809 13.0165C6.49229 13.2569 6.87076 13.3836 7.25833 13.375H15.4083C15.7876 13.3744 16.1554 13.2444 16.4509 13.0065C16.7463 12.7687 16.9518 12.4371 17.0333 12.0667L18.4083 5.875H4.26667',
        stroke,
        'stroke-width': '1.66667',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
    })
]);

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

// Current step (1-indexed)
const currentStep = ref(1);

// Steps configuration
const steps = ref([
    {
        label: ['Connect to', 'Shopify'],
        icon: ShopifyIcon,
        title: 'Connect to Shopify',
        description: 'Link your Shopify store to sync products, orders, and customer data.',
        component: StepOne
    },
    {
        label: ['Connect', 'Retail Express'],
        icon: LinkIcon,
        title: 'Connect Retail Express',
        description: 'Integrate with Retail Express to manage your retail operations seamlessly.',
        component: StepTwo
    },
    {
        label: ['Products'],
        icon: PackageIcon,
        title: 'Products',
        description: 'Import and configure your product catalog for both online and retail channels.'
    },
    {
        label: ['Customers'],
        icon: UsersIcon,
        title: 'Customers',
        description: 'Sync customer information and create unified customer profiles across channels.'
    },
    {
        label: ['Orders'],
        icon: CartIcon,
        title: 'Orders',
        description: 'Configure order management and fulfillment settings for your business.'
    },
    {
        label: ['Stores &', 'Inventory'],
        icon: StoreIcon,
        title: 'Stores & Inventory',
        description: 'Set up your store locations and inventory management preferences.'
    }
]);

// Navigation functions
const goNext = () => {
    if (currentStep.value < steps.value.length) {
        currentStep.value++;
    }
};

const goBack = () => {
    if (currentStep.value === 1) {
        window.location.href = '/connections';
        return;
    }

    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

// Style helper functions
const getStepWrapperClass = (index) => {
    if (index + 1 < currentStep.value) return 'completed';
    if (index + 1 === currentStep.value) return 'active';
    return 'disabled';
};

const getStepCircleClass = (index) => {
    if (index + 1 < currentStep.value) return 'completed';
    if (index + 1 === currentStep.value) return 'active';
    return 'inactive';
};

const getStepLabelClass = (index) => {
    if (index + 1 < currentStep.value) return 'completed';
    if (index + 1 === currentStep.value) return 'active';
    return 'inactive';
};

const getIconColor = (index) => {
    if (index + 1 <= currentStep.value) return 'white';
    return '#4A5565';
};
</script>

<template>
    <div class="progress-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-4 pb-4">
            <div class="section-header">Setup Progress</div>
            <div class="step-counter">Step {{ currentStep }} of {{ steps.length }}</div>
        </div>

        <div class="position-relative">
            <div class="progress-line"></div>

            <div class="d-flex justify-content-between">
                <div v-for="(step, index) in steps" :key="index" class="step-wrapper"
                    :class="getStepWrapperClass(index)">
                    <div class="step-circle" :class="getStepCircleClass(index)">
                        <component :is="step.icon" :stroke="getIconColor(index)" />
                    </div>
                    <div class="step-label" :class="getStepLabelClass(index)">
                        <div v-for="(line, i) in step.label" :key="i">{{ line }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <step-one v-if="currentStep === 1"></step-one>
    <step-two v-if="currentStep === 2"></step-two>
    <step-three v-if="currentStep === 3"></step-three>
    <step-four v-if="currentStep === 4"></step-four>

    <div class="d-flex justify-content-between align-items-center gap-3 mt-4">
        <button class="btn-back" @click.prevent="goBack()">
            <span v-if="currentStep === 1">Back to Connections Page</span>
            <span v-if="currentStep > 1">Back to {{ steps[currentStep - 2].title }}</span>
        </button>
        <button class="btn-continue" @click="goNext">Continue to {{ steps[currentStep].title }}</button>
    </div>
</template>
