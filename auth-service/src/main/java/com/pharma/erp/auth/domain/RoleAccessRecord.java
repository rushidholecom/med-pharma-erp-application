package com.pharma.erp.auth.domain;

public record RoleAccessRecord(
        String role,
        int activeUsers,
        int liveSessions,
        String auditState
) {
}

