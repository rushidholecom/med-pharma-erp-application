package com.pharma.erp.finance.domain;

public record FinanceStreamRecord(
        String stream,
        String monthlyValueCr,
        String agingBucket,
        String riskLevel
) {
}

