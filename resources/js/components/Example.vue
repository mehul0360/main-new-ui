<script setup>
import { ref } from 'vue';

const count = ref(0);

const increment = () => {
    count.value++;
};
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>
                    <div class="card-body">
                        I'm an example component using Vue 3 Composition API!
                        <p class="mt-3">Counter: {{ count }}</p>
                        <button @click="increment" class="btn btn-primary">
                            Increment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
