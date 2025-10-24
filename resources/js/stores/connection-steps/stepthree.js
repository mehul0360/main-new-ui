import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepThreeStore = defineStore('stepThree', () => {
    const payload = ref({
        primarySystem: 'retail-express',

        retailExpressField: 'product_id',
        shopifyField: 'barcode',

        createState: 'draft_inactive',
        inactiveAction: 'mark_as_draft',
        backOrders: 'enable',
        weightUnit: 'kilograms_kg',

        shortDescSync: 'create_only',
        longDescSync: 'create_only',
        titleField: 'product_title',
        descriptionField: 'product_description',
        skuField: 'sku',
        productTypeField: 'product_type',
        weightField: 'weight',
        lengthField: 'length',
        widthField: 'width',
        heightField: 'height',
        vendorField: 'vendor',
        barcodeField: 'barcode',

        productGroupingField: 'Custom1',
        variantAttributes: [],

        pricingMode: 'fixed',
        fixedPriceSync: 'create_only',
        fixedMSRPSync: 'create_only',
        typeCost: 'cogs_excl_tax',
        syncCostPerOutlet: false,
        selectedOutlet: '',
        retailExpressPrice: 'rrp_incl_tax',
        retailExpressMSRP: 'rrp_incl_tax',

        savedAt: null
    });

    const isSaved = ref(false);

    async function saveInStorage(data) {
        payload.value = {
            ...data,
            savedAt: new Date().toISOString()
        };
        isSaved.value = true;
    }

    function clearStorage() {
        payload.value = {
            primarySystem: 'retail-express',
            retailExpressField: 'product_id',
            shopifyField: 'barcode',
            createState: 'draft_inactive',
            inactiveAction: 'mark_as_draft',
            backOrders: 'enable',
            weightUnit: 'kilograms_kg',
            shortDescSync: 'create_only',
            longDescSync: 'create_only',
            titleField: 'product_title',
            descriptionField: 'product_description',
            skuField: 'sku',
            productTypeField: 'product_type',
            weightField: 'weight',
            lengthField: 'length',
            widthField: 'width',
            heightField: 'height',
            vendorField: 'vendor',
            barcodeField: 'barcode',
            productGroupingField: 'Custom1',
            variantAttributes: [],
            pricingMode: 'fixed',
            fixedPriceSync: 'create_only',
            fixedMSRPSync: 'create_only',
            typeCost: 'cogs_excl_tax',
            syncCostPerOutlet: false,
            selectedOutlet: '',
            retailExpressPrice: 'rrp_incl_tax',
            retailExpressMSRP: 'rrp_incl_tax',
            savedAt: null
        };
        isSaved.value = false;
    }

    function getPayload() {
        return payload.value;
    }

    return {
        payload,
        isSaved,

        saveInStorage,
        clearStorage,
        getPayload
    };
}, {
    persist: true
});
