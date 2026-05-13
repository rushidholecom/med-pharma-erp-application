package com.pharma.erp.sales.domain;

import java.util.List;
import java.util.Map;

public record ModuleSnapshot<T>(
        String serviceName,
        String moduleTitle,
        String operationalStatus,
        String description,
        List<String> highlights,
        Map<String, Object> metrics,
        List<T> records,
        String lastUpdated
) {
}

