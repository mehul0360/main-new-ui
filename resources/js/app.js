import './bootstrap';
import { createApp } from 'vue';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const app = createApp({});

// Auto-register all .vue files in components directory and subdirectories
const components = import.meta.glob('./components/**/*.vue', { eager: true });

Object.entries(components).forEach(([path, module]) => {
    // Extract component name from file path
    // Examples:
    // './components/ExampleComponent.vue' -> 'example-component'
    // './components/dashboard/StatsCard.vue' -> 'stats-card'
    // './components/user/profile/Avatar.vue' -> 'avatar'

    const componentName = path
        .split('/')
        .pop() // Get the filename
        .replace(/\.\w+$/, '') // Remove file extension
        .replace(/([a-z])([A-Z])/g, '$1-$2') // Convert PascalCase to kebab-case
        .toLowerCase();

    // Register component globally
    app.component(componentName, module.default);
});

app.mount('#app');
