package com.pharma.erp.catalog.domain;

public record MedicineRecord(
        String sku,
        String productName,
        String dosageForm,
        String lifecycleState
) {
}

