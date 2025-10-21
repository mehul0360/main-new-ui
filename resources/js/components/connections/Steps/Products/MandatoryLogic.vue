<script setup></script>

<template>
    <div class="card mandatory-card position-relative overflow-hidden my-4">
        <div class="card-body p-4">
            <div class="d-flex flex-column gap-2 mb-4">
                <h2 class="card-title mb-0">Mandatory / Baked-in Logic</h2>
                <p class="card-description mb-0">
                    These behaviors are built into the system and work automatically without user configuration.
                </p>
            </div>

            <div class="d-flex flex-column gap-3">
                <div class="logic-item logic-item-green">
                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex flex-column gap-2 flex-fill">
                            <div class="d-flex align-items-center gap-2">
                                <div class="logic-title">✓ Export to Web Filter</div>
                                <info-blue
                                    title="Only products marked as 'Export to Web' in Retail Express will be included in the sync process."
                                    placement="top" />
                            </div>
                            <div class="logic-description">
                                Only products marked "Export to Web" are synced
                            </div>
                        </div>
                    </div>
                </div>

                <div class="logic-item logic-item-purple">
                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex flex-column gap-2 flex-fill">
                            <div class="d-flex align-items-center gap-2">
                                <div class="logic-title">✓ Product Status &amp; Image Sync</div>
                                <info-blue
                                    title="Products created in Shopify default to Draft status. Product images automatically sync from Retail Express to Shopify."
                                    placement="top" />
                            </div>
                            <div class="logic-description">
                                Shopify products default to Draft status, images sync Retail Express &rarr; Shopify
                            </div>
                        </div>
                    </div>
                </div>

                <div class="logic-item logic-item-orange">
                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex flex-column gap-2 flex-fill">
                            <div class="d-flex align-items-center gap-2">
                                <div class="logic-title">✓ Tax Status &amp; Stock Management</div>
                                <info-blue
                                    title="Tax status is managed from Retail Express. Stock values sync automatically, and products with 'prevent disabling' enabled remain available even with zero stock."
                                    placement="top" />
                            </div>
                            <div class="logic-description">
                                Taxable status managed from Retail Express, stock sync with backorder logic
                            </div>
                        </div>
                    </div>
                </div>

                <div class="logic-item logic-item-gray">
                    <div class="d-flex align-items-start gap-3">
                        <div class="d-flex flex-column gap-2 flex-fill">
                            <div class="d-flex align-items-center gap-2">
                                <div class="logic-title">✓ Automatic Variant Sorting</div>
                                <info-blue
                                    title="Product variant options are automatically sorted alphanumerically. No custom sequence configuration is available."
                                    placement="top" />
                            </div>
                            <div class="logic-description">
                                Product attribute options sorted alphanumerically
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mandatory-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 33px !important;
}

.card-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 20px;
    line-height: 28px;
    color: #101828;
}

.card-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #4a5565;
}

.logic-item {
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid;
}

.logic-item-green {
    background-color: #f0fdf4;
    border-color: #bbf7d0;
}

.logic-item-purple {
    background-color: #faf5ff;
    border-color: #e9d5ff;
}

.logic-item-orange {
    background-color: #fff7ed;
    border-color: #fed7aa;
}

.logic-item-gray {
    background-color: #f9fafb;
    border-color: #e5e7eb;
}

.logic-title {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #101828;
}

.logic-description {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
    color: #4a5565;
}

.sync-behavior-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #e5e7eb;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
</style>
