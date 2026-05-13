package com.pharma.erp.employee.domain;

public record TeamReadinessRecord(
        String team,
        int onShift,
        String trainingCoverage,
        String complianceRisk
) {
}

