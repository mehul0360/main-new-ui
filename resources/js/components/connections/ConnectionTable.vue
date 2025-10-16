<script setup>
import { onMounted } from 'vue';

const connections = [
    {
        plugins: {
            main: { image: "M", color: 'bg-warning' },
            other: { image: "RE", color: 'bg-primary' },
        },
        name: 'Alpine',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '2 days ago',
    },
    {
        plugins: {
            main: { image: "RE", color: 'bg-primary' },
            other: { image: "S", color: 'bg-success' },
        },
        name: 'Zorich',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '3 days ago',
    },
    {
        plugins: {
            main: { image: "M", color: 'bg-warning' },
            other: { image: "RE", color: 'bg-primary' },
        },
        name: 'Selby Acoustics',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '3 days ago',
    },
    {
        plugins: {
            main: { image: "RE", color: 'bg-primary' },
            other: { image: "S", color: 'bg-success' },
        },
        name: 'Selby Acoustics',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '3 days ago',
    },
    {
        plugins: {
            main: { image: "M", color: 'bg-primary' },
            other: { image: "S", color: 'bg-success' },
        },
        name: 'Workingonit - Lo fi',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '4 days ago',
    },
    {
        plugins: {
            main: { image: "M", color: 'bg-purple' },
            other: { image: "RE", color: 'bg-primary' },
        },
        name: 'RSPCA ACT',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '4 days ago',
    },
    {
        plugins: {
            main: { image: "M", color: 'bg-purple' },
            other: { image: "S", color: 'bg-success' },
        },
        name: 'Surepak Live',
        status: 'Active',
        created_at: '1 month ago',
        updated_at: '4 days ago',
    },
];

onMounted(() => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

const goToConnection = (connection) => {
    window.location.href = '/connections/build';
    return;
}
</script>

<template>
    <div class="card border shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-header">
                    <tr>
                        <th class="text-uppercase small fw-medium py-3">Platforms</th>
                        <th class="text-uppercase small fw-medium py-3">Connection</th>
                        <th class="text-uppercase small fw-medium py-3">Connected</th>
                        <th class="text-uppercase small fw-medium py-3">Status</th>
                        <th class="text-uppercase small fw-medium py-3">Created At</th>
                        <th class="text-uppercase small fw-medium py-3">Updated At</th>
                        <th class="text-uppercase small fw-medium py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(connection, index) in connections" :key="index">
                        <td class="align-middle px-4">
                            <div class="d-flex align-items-center gap-2">
                                <div :class="`icon-box ${connection.plugins.main.color}`">
                                    <span class="text-white icon-box-md">{{ connection.plugins.main.image }}</span>
                                </div>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="arrow-icon">
                                    <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="2" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round"></path>
                                </svg>
                                <div :class="`icon-box ${connection.plugins.other.color}`">
                                    <span class="text-white icon-box-sm">{{ connection.plugins.other.image }}</span>
                                </div>
                            </div>
                        </td>
                        <td class="align-middle fw-medium">{{ connection.name }}</td>
                        <td class="align-middle">
                            <div class="settings-box d-inline-block" data-bs-toggle="tooltip" title="Complete Setup"
                                @click="goToConnection(connection)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-cog w-6 h-6 text-white"
                                    aria-hidden="true">
                                    <path d="M11 10.27 7 3.34"></path>
                                    <path d="m11 13.73-4 6.93"></path>
                                    <path d="M12 22v-2"></path>
                                    <path d="M12 2v2"></path>
                                    <path d="M14 12h8"></path>
                                    <path d="m17 20.66-1-1.73"></path>
                                    <path d="m17 3.34-1 1.73"></path>
                                    <path d="M2 12h2"></path>
                                    <path d="m20.66 17-1.73-1"></path>
                                    <path d="m20.66 7-1.73 1"></path>
                                    <path d="m3.34 17 1.73-1"></path>
                                    <path d="m3.34 7 1.73 1"></path>
                                    <circle cx="12" cy="12" r="2"></circle>
                                    <circle cx="12" cy="12" r="8"></circle>
                                </svg>
                            </div>
                        </td>
                        <td class="align-middle text-muted">{{ connection.status }}</td>
                        <td class="align-middle text-muted">{{ connection.created_at }}</td>
                        <td class="align-middle text-muted">{{ connection.updated_at }}</td>
                        <td class="align-middle">
                            <div class="d-flex gap-1">
                                <button class="action-btn" title="Settings">
                                    <i class="bi bi-gear"></i>
                                </button>
                                <button class="action-btn" title="Copy">
                                    <i class="bi bi-files"></i>
                                </button>
                                <button class="action-btn btn-delete" title="Delete">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
