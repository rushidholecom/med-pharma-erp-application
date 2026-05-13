package com.pharma.erp.sales.domain;

public record DistributionOrderRecord(
        String region,
        int openOrders,
        String dispatchEta,
        String serviceLevel
) {
}

