<script setup>
import { ref } from 'vue';
import { StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix } from '@/components/connections/Steps';
import { useStepTwoStore, useStepThreeStore, useStepFourStore, useStepFiveStore, useStepSixStore } from '@/stores/connection-steps';
import { ShopifyIcon, LinkIcon, PackageIcon, UsersIcon, CartIcon, StoreIcon } from '@/components/Icons';

const currentStep = ref(0);

const steps = ref([
    {
        label: ['Connect to', 'Shopify'],
        icon: ShopifyIcon,
        title: 'Connect to Shopify',
        isCompleted: false,
        component: StepOne
    },
    {
        label: ['Connect', 'Retail Express'],
        icon: LinkIcon,
        title: 'Connect Retail Express',
        isCompleted: false,
        component: StepTwo
    },
    {
        label: ['Products'],
        icon: PackageIcon,
        title: 'Products',
        isCompleted: false,
        component: StepThree
    },
    {
        label: ['Customers'],
        icon: UsersIcon,
        title: 'Customers',
        isCompleted: false,
        component: StepFour
    },
    {
        label: ['Orders'],
        icon: CartIcon,
        title: 'Orders',
        isCompleted: false,
        component: StepFive
    },
    {
        label: ['Stores &', 'Inventory'],
        icon: StoreIcon,
        title: 'Stores & Inventory',
        isCompleted: false,
        component: StepSix
    }
]);

const stepTwoStore = useStepTwoStore();
const stepThreeStore = useStepThreeStore();
const stepFourStore = useStepFourStore();
const stepFiveStore = useStepFiveStore();
const stepSixStore = useStepSixStore();

const stepTwoRef = ref(null);
const stepThreeRef = ref(null);
const stepFourRef = ref(null);
const stepFiveRef = ref(null);
const stepSixRef = ref(null);

const stepConfigs = {
    1: {
        ref: stepTwoRef,
        store: stepTwoStore,
        name: 'Step 2',
        errorMessage: 'Please complete all fields and establish a connection before proceeding.'
    },
    2: {
        ref: stepThreeRef,
        store: stepThreeStore,
        name: 'Step 3',
        errorMessage: 'Please complete the product mapping configuration before proceeding.'
    },
    3: {
        ref: stepFourRef,
        store: stepFourStore,
        name: 'Step 4',
        errorMessage: 'Please complete the customer configuration before proceeding.'
    },
    4: {
        ref: stepFiveRef,
        store: stepFiveStore,
        name: 'Step 5',
        errorMessage: 'Please complete the order configuration before proceeding.'
    },
    5: {
        ref: stepSixRef,
        store: stepSixStore,
        name: 'Step 6',
        errorMessage: 'Please complete at least one store mapping before proceeding.'
    }
};

const goToConnectionsListingPage = async () => {
    if (currentStep.value === 5) {
        const stepSix = stepSixRef.value;
        if (stepSix) {
            const isValid = stepSix.validateForm();
            if (!isValid) {
                alert('Please complete at least one store mapping before finishing setup.');
                return;
            }

            const formData = stepSix.getFormData();
            await stepSixStore.saveInStorage(formData);
        }
    }

    window.location.href = '/connections';
};

const goNext = async () => {
    if (currentStep.value >= steps.value.length) {
        return;
    }

    const config = stepConfigs[currentStep.value];
    if (config) {
        const stepRef = config.ref.value;
        if (!stepRef) {
            return;
        }

        const isValid = stepRef.validateForm();
        if (!isValid) {
            alert(config.errorMessage);
            return;
        }

        const formData = stepRef.getFormData();
        await config.store.saveInStorage(formData);
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    steps.value[currentStep.value].isCompleted = true;

    setTimeout(() => {
        currentStep.value++;
    }, 200);
};

const goBack = () => {
    if (currentStep.value === 0) {
        window.location.href = '/connections';
        return;
    }

    if (currentStep.value > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

        setTimeout(() => {
            currentStep.value--;
        }, 200);
    }
};

const showStepIfCompleted = (index) => {
    if (currentStep.value > index || steps.value[index].isCompleted) {
        currentStep.value = index;
    }
}

const getStepWrapperClass = (index) => {
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    if (index === currentStep.value || steps.value[index].isCompleted) return 'active';
    return 'disabled';
};

const getStepCircleClass = (index) => {
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    if (index === currentStep.value) return 'active';
    return 'inactive';
};

const getStepLabelClass = (index) => {
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    if (index === currentStep.value) return 'active';
    return 'inactive';
};

const getIconColor = (index) => {
    if (index <= currentStep.value || steps.value[index].isCompleted) return 'white';
    return '#4A5565';
};
</script>

<template>
    <div class="progress-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-4 pb-4">
            <div class="section-header">Setup Progress</div>
            <div class="step-counter">Step {{ currentStep + 1 }} of {{ steps.length }}</div>
        </div>

        <div class="position-relative">
            <div class="progress-line"></div>

            <div class="d-flex justify-content-between">
                <div v-for="(step, index) in steps" :key="index" class="step-wrapper"
                    :class="getStepWrapperClass(index)" @click="showStepIfCompleted(index)">
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

    <step-one v-if="currentStep === 0"></step-one>
    <step-two v-if="currentStep === 1" ref="stepTwoRef"></step-two>
    <step-three v-if="currentStep === 2" ref="stepThreeRef"></step-three>
    <step-four v-if="currentStep === 3" ref="stepFourRef"></step-four>
    <step-five v-if="currentStep === 4" ref="stepFiveRef"></step-five>
    <step-six v-if="currentStep === 5" ref="stepSixRef"></step-six>

    <div class="d-flex justify-content-between align-items-center gap-3 mt-4">
        <button class="btn-back" @click.prevent="goBack()">
            <span v-if="currentStep === 0">Back to Connections Page</span>
            <span v-if="currentStep > 0">Back to {{ steps[currentStep - 1].title }}</span>
        </button>
        <button class="btn-continue" @click="goNext" v-if="currentStep <= 4">
            Continue to {{ steps[currentStep + 1].title }}
        </button>
        <button class="btn-finish" @click="goToConnectionsListingPage" v-if="currentStep === 5">
            Complete Setup
        </button>
    </div>
</template>
