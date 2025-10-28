import { ref, watch } from 'vue';

/**
 * Auto-save composable for form data
 * @param {Object} formData - Reactive ref containing form data
 * @param {Function} saveFunction - Store's save function
 * @param {Object} options - Configuration options
 * @returns {Object} - Auto-save state and functions
 */
export function useAutoSave(formData, saveFunction, options = {}) {
    const {
        debounceDelay = 800,
        includeInSave = () => ({}),
        onSaveSuccess = null,
        onSaveError = null,
        enabled = true
    } = options;

    const isSaving = ref(false);
    const lastSavedAt = ref(null);
    const saveError = ref(null);

    let autoSaveTimer = null;

    /**
     * Performs the auto-save operation
     */
    const performAutoSave = async () => {
        if (!enabled) return;

        isSaving.value = true;
        saveError.value = null;

        try {
            // Merge form data with any additional data
            const dataToSave = {
                ...formData.value,
                ...includeInSave()
            };

            await saveFunction(dataToSave);

            lastSavedAt.value = new Date();

            if (onSaveSuccess) {
                onSaveSuccess(dataToSave);
            }
        } catch (error) {
            saveError.value = error;

            if (onSaveError) {
                onSaveError(error);
            } else {
                console.error('Auto-save failed:', error);
            }
        } finally {
            setTimeout(() => {
                isSaving.value = false;
            }, 500);
        }
    };

    /**
     * Manually trigger save (bypasses debounce)
     */
    const saveNow = async () => {
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = null;
        }
        await performAutoSave();
    };

    /**
     * Cancel pending auto-save
     */
    const cancelAutoSave = () => {
        if (autoSaveTimer) {
            clearTimeout(autoSaveTimer);
            autoSaveTimer = null;
        }
    };

    // Watch form data with debouncing
    if (enabled) {
        watch(
            formData,
            () => {
                // Clear existing timer
                if (autoSaveTimer) {
                    clearTimeout(autoSaveTimer);
                }

                // Set new timer for auto-save
                autoSaveTimer = setTimeout(() => {
                    performAutoSave();
                }, debounceDelay);
            },
            { deep: true }
        );
    }

    return {
        isSaving,
        lastSavedAt,
        saveError,
        saveNow,
        cancelAutoSave
    };
}
