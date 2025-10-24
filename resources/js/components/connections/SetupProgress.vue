<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue';
import { StepOne, StepTwo, StepThree, StepFour, StepFive, StepSix } from '@/components/connections/Steps';
import { useStepTwoStore, useStepThreeStore, useStepFourStore, useStepFiveStore, useStepSixStore } from '@/stores/connection-steps';
import { ShopifyIcon, LinkIcon, PackageIcon, UsersIcon, CartIcon, StoreIcon } from '@/components/Icons';

const currentStep = ref(0);

const stepRefs = {
    1: ref(null),
    2: ref(null),
    3: ref(null),
    4: ref(null),
    5: ref(null)
};

const stores = {
    1: useStepTwoStore(),
    2: useStepThreeStore(),
    3: useStepFourStore(),
    4: useStepFiveStore(),
    5: useStepSixStore()
};

const steps = shallowRef([
    {
        label: ['Connect to', 'Shopify'],
        icon: ShopifyIcon,
        title: 'Connect to Shopify',
        component: StepOne,
        isCompleted: false
    },
    {
        label: ['Connect', 'Retail Express'],
        icon: LinkIcon,
        title: 'Connect Retail Express',
        component: StepTwo,
        errorMessage: 'Please complete all fields and establish a connection before proceeding.',
        isCompleted: false
    },
    {
        label: ['Products'],
        icon: PackageIcon,
        title: 'Products',
        component: StepThree,
        errorMessage: 'Please complete the product mapping configuration before proceeding.',
        isCompleted: false
    },
    {
        label: ['Customers'],
        icon: UsersIcon,
        title: 'Customers',
        component: StepFour,
        errorMessage: 'Please complete the customer configuration before proceeding.',
        isCompleted: false
    },
    {
        label: ['Orders'],
        icon: CartIcon,
        title: 'Orders',
        component: StepFive,
        errorMessage: 'Please complete the order configuration before proceeding.',
        isCompleted: false
    },
    {
        label: ['Stores &', 'Inventory'],
        icon: StoreIcon,
        title: 'Stores & Inventory',
        component: StepSix,
        errorMessage: 'Please complete at least one store mapping before proceeding.',
        isCompleted: false
    }
]);

const totalSteps = computed(() => steps.value.length);
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1);
const isFirstStep = computed(() => currentStep.value === 0);
const currentStepConfig = computed(() => steps.value[currentStep.value]);
const previousStepTitle = computed(() =>
    currentStep.value > 0 ? steps.value[currentStep.value - 1].title : ''
);
const nextStepTitle = computed(() =>
    currentStep.value < totalSteps.value - 1 ? steps.value[currentStep.value + 1].title : ''
);

const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};

const navigateToConnections = () => {
    window.location.href = '/connections';
};

const validateAndSaveStep = async (stepIndex) => {
    if (stepIndex === 0) return true;

    const stepRef = stepRefs[stepIndex].value;
    if (!stepRef) return true;

    const isValid = stepRef.validateForm();
    if (!isValid) {
        alert(steps.value[stepIndex].errorMessage);
        return false;
    }

    const formData = stepRef.getFormData();
    await stores[stepIndex].saveInStorage(formData);
    return true;
};

const changeStep = (newStep) => {
    scrollToTop();
    setTimeout(() => {
        currentStep.value = newStep;
    }, 200);
};

const goNext = async () => {
    if (currentStep.value >= totalSteps.value) return;

    const isValid = await validateAndSaveStep(currentStep.value);
    if (!isValid) return;

    steps.value[currentStep.value].isCompleted = true;
    changeStep(currentStep.value + 1);
};

const goBack = () => {
    if (isFirstStep.value) {
        navigateToConnections();
        return;
    }

    changeStep(currentStep.value - 1);
};

const goToConnectionsListingPage = async () => {
    const isValid = await validateAndSaveStep(currentStep.value);
    if (isValid) {
        navigateToConnections();
    }
};

const showStepIfCompleted = (index) => {
    if (currentStep.value > index || steps.value[index].isCompleted) {
        currentStep.value = index;
    }
};

const getStepWrapperClass = (index) => {
    if (index === currentStep.value) return 'active';
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    return 'disabled';
};

const getStepCircleClass = (index) => {
    if (index === currentStep.value) return 'active';
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    return 'inactive';
};

const getStepLabelClass = (index) => {
    if (index === currentStep.value) return 'active';
    if (index < currentStep.value || steps.value[index].isCompleted) return 'completed';
    return 'inactive';
};

const getIconColor = (index) => {
    return (index <= currentStep.value || steps.value[index].isCompleted) ? 'white' : '#4A5565';
};

onMounted(() => {
    const updatedSteps = [...steps.value];
    Object.keys(stores).forEach(stepIndex => {
        const store = stores[stepIndex];
        if (store.isSaved) {
            updatedSteps[parseInt(stepIndex)].isCompleted = true;
        }
    });
    steps.value = updatedSteps;

    const firstIncompleteIndex = steps.value.findIndex(step => !step.isCompleted);
    if (firstIncompleteIndex !== -1) {
        currentStep.value = firstIncompleteIndex;
    } else {
        currentStep.value = steps.value.length - 1;
    }
});
</script>

<template>
    <div class="progress-card p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-4 pb-4">
            <div class="section-header">Setup Progress</div>
            <div class="step-counter">Step {{ currentStep + 1 }} of {{ totalSteps }}</div>
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

    <component :is="currentStepConfig.component"
        :ref="el => { if (currentStep > 0) stepRefs[currentStep].value = el }" />

    <div class="d-flex justify-content-between align-items-center gap-3 mt-4">
        <button class="btn-back" @click.prevent="goBack">
            <span v-if="isFirstStep">Back to Connections Page</span>
            <span v-else>Back to {{ previousStepTitle }}</span>
        </button>

        <button v-if="!isLastStep" class="btn-continue" @click="goNext">
            Continue to {{ nextStepTitle }}
        </button>

        <button v-else class="btn-finish" @click="goToConnectionsListingPage">
            Complete Setup
        </button>
    </div>
</template>
