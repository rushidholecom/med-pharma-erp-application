package com.pharma.erp.procurement.domain;

public record VendorOrderRecord(
        String supplier,
        String purchaseOrder,
        String eta,
        String riskLevel
) {
}

