package com.pharma.erp.inventory.domain;

public record InventoryBatchRecord(
        String item,
        String batchCode,
        int quantity,
        String stockState
) {
}

