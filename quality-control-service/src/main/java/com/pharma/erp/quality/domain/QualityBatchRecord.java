package com.pharma.erp.quality.domain;

public record QualityBatchRecord(
        String batchCode,
        String disposition,
        int deviations,
        String releaseWindow
) {
}

