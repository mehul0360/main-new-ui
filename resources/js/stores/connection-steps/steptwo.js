import { ref } from "vue";
import { defineStore } from "pinia";

export const useStepTwoStore = defineStore('stepTwo', () => {
    const payload = ref({
        domain: '',
        username: '',
        password: '',
        clientId: '',
        channelId: '',
        primaryKey: '',
        secondaryKey: '',
        isConnected: false,
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
            domain: '',
            username: '',
            password: '',
            clientId: '',
            channelId: '',
            primaryKey: '',
            secondaryKey: '',
            isConnected: false,
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
