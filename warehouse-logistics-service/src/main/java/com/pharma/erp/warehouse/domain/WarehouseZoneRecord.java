package com.pharma.erp.warehouse.domain;

public record WarehouseZoneRecord(
        String zone,
        int palletCount,
        String coldChainState,
        String dispatchReadiness
) {
}

