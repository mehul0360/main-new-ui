<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import AutoSaveIndicator from '@/components/AutoSaveIndicator.vue';
import { useStepFiveStore } from '@/stores/connection-steps/stepfive';
import InfoRed from '@/components/Icons/InfoRed.vue';

const props = defineProps({
    isSaving: { type: Boolean, default: false },
    lastSavedAt: { type: Date, default: null },
    saveError: { type: Error, default: null },
    displayDuration: { type: Number, default: 3000 }
});

const emit = defineEmits(['data-changed']);

const stepFiveStore = useStepFiveStore();
const { payload, isSaved } = storeToRefs(stepFiveStore);

const clickCollectData = ref({
    enableClickCollect: false,
    restrictAvailability: 'all_products',
    enableMinStock: false,
    minStockThreshold: '',
    searchRadius: '',
    customTag: ''
});

onMounted(() => {
    fetchStoredData();
});

const fetchStoredData = () => {
    if (isSaved.value && payload.value) {
        if (payload.value.clickCollect) {
            clickCollectData.value = { ...payload.value.clickCollect };
        }
    }
};

const getFormData = () => {
    return {
        enableClickCollect: clickCollectData.value.enableClickCollect,
        restrictAvailability: clickCollectData.value.restrictAvailability,
        enableMinStock: clickCollectData.value.enableMinStock,
        minStockThreshold: clickCollectData.value.minStockThreshold,
        searchRadius: clickCollectData.value.searchRadius,
        customTag: clickCollectData.value.customTag,
    };
};

watch(
    clickCollectData,
    () => {
        emit('data-changed', getFormData());
    },
    { deep: true }
);

defineExpose({
    getFormData
});
</script>

<template>
    <div class="card click-collect-card position-relative overflow-hidden">
        <div class="card-body p-4">
            <div class="d-flex justify-content-between mb-3">
                <h3 class="subsection-title">Enable Click & Collect</h3>

                <AutoSaveIndicator :is-saving="isSaving" :last-saved-at="lastSavedAt" :save-error="saveError"
                    :display-duration="1500" />
            </div>

            <div class="d-flex align-items-start gap-3 mb-4" style="padding-top: 0.25rem;">
                <input type="checkbox" v-model="clickCollectData.enableClickCollect" id="enable_click_collect"
                    class="form-check-input checkbox-custom mt-1">

                <div class="d-flex flex-column gap-1 flex-fill">
                    <label for="enable_click_collect" class="checkbox-main-label cursor-pointer mb-0">
                        Enable Click & Collect for this integration
                    </label>
                    <div class="checkbox-description">
                        Allow customers to place orders online and collect from your store locations
                    </div>
                </div>
            </div>

            <div class="mb-4">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h3 class="subsection-title mb-0">Restrict Click & Collect availability to:</h3>

                    <info-red is-small
                        title="Filter which products are available for Click & Collect based on Shopify product tags or collections. By default, all products are available for pickup." />
                </div>

                <select v-model="clickCollectData.restrictAvailability" class="form-select custom-select-md">
                    <option value="all_products">All Products</option>
                    <option value="based_on_collection_name">Based on Collection Name</option>
                    <option value="based_on_tag">Based on Tag</option>
                </select>
            </div>

            <div class="mb-4">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h3 class="subsection-title mb-0">Set minimum stock level for Pick Up availability?</h3>

                    <info-red is-small
                        title="Prevents customers from selecting pick-up if stock falls below this threshold at the location. Helps ensure product availability when customers arrive." />
                </div>

                <div class="d-flex align-items-start gap-2 mb-3" style="padding-top: 0.25rem;">
                    <input type="checkbox" v-model="clickCollectData.enableMinStock" id="enable_min_stock"
                        class="form-check-input checkbox-custom mt-1">

                    <div class="d-flex flex-column gap-1 flex-fill">
                        <label for="enable_min_stock" class="checkbox-main-label cursor-pointer mb-0">
                            Yes, set minimum stock threshold
                        </label>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="field-label-md">Minimum stock threshold</label>

                    <input type="number" v-model="clickCollectData.minStockThreshold"
                        class="form-control custom-input-md" placeholder="Enter minimum stock level" min="0">
                </div>
            </div>

            <div class="mb-4">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h3 class="subsection-title mb-0">Customer location search radius (km)</h3>

                    <info-red is-small
                        title="Defines the maximum distance from the customer's location to eligible Click & Collect stores. Customers will only see pickup locations within this radius." />
                </div>

                <input type="number" v-model="clickCollectData.searchRadius" class="form-control custom-input-md"
                    placeholder="Enter radius in kilometers" min="1" step="0.1">
            </div>

            <div class="mb-4">
                <div class="d-flex align-items-center gap-2 mb-2">
                    <h3 class="subsection-title mb-0">Custom tag for Click & Collect orders</h3>

                    <info-red is-small
                        title="This tag will be attached to Click & Collect orders in Shopify to differentiate from delivery orders. Useful for filtering and reporting." />
                </div>

                <input type="text" v-model="clickCollectData.customTag" class="form-control custom-input-md"
                    placeholder="Enter custom tag (e.g., click-collect)">
            </div>
        </div>
    </div>
</template>

<style scoped>
.click-collect-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
}

.section-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.subsection-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #101828;
}

.field-label-md {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #101828;
}

.checkbox-main-label {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #101828;
}

.checkbox-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.custom-select-md {
    max-width: 448px;
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-select-md:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.custom-input-md {
    max-width: 448px;
    height: 36px;
    font-size: 14px;
    background-color: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s, box-shadow 0.2s;
    font-family: 'Roboto', sans-serif;
}

.custom-input-md:focus {
    background-color: #f9fafb;
    border-color: #155dfc;
    box-shadow: 0 0 0 3px rgba(21, 93, 252, 0.1);
    outline: none;
}

.checkbox-custom {
    accent-color: #155dfc;
    width: 16px;
    height: 16px;
    margin: 0;
    flex-shrink: 0;
}

.cursor-pointer {
    cursor: pointer;
}

@media (max-width: 768px) {
    .section-title {
        font-size: 18px;
        line-height: 24px;
    }

    .subsection-title {
        font-size: 16px;
        line-height: 22px;
    }

    .custom-select-md,
    .custom-input-md {
        max-width: 100%;
    }

    .checkbox-main-label {
        font-size: 15px;
    }

    .checkbox-description {
        font-size: 13px;
    }
}
</style>
