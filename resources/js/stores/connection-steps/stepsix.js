import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepSixStore = defineStore('stepSix', () => {
    const payload = ref({
        storeMappings: {
            data: [
                { id: 1, retailStore: '', shopifyStore: '' }
            ]
        },

        bufferQuantityMappings: {
            data: [
                { id: 1, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
                { id: 2, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 }
            ]
        },

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
            storeMappings: {
                data: [
                    { id: 1, retailStore: '', shopifyStore: '' }
                ]
            },
            bufferQuantityMappings: {
                data: [
                    { id: 1, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 },
                    { id: 2, shopifyStore: '', product_type: '', brand: '', buffer_quantity: 0 }
                ]
            },
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
