package com.pharma.erp.production.domain;

public record ProductionLotRecord(
        String lotNumber,
        String line,
        int plannedUnits,
        String completionRate
) {
}

