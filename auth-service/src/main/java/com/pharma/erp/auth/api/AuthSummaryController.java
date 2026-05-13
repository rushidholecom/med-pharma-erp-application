package com.pharma.erp.auth.api;

import com.pharma.erp.auth.domain.ModuleSnapshot;
import com.pharma.erp.auth.domain.RoleAccessRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class AuthSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<RoleAccessRecord> summary() {
        return new ModuleSnapshot<>(
                "auth-service",
                "Identity & Access",
                "Healthy",
                "Tracks role coverage, MFA posture, and active ERP session activity.",
                List.of(
                        "94% MFA adoption across regulated teams",
                        "12 suspicious login attempts blocked today",
                        "Zero privilege escalation incidents in the last 30 days"
                ),
                Map.of(
                        "activeUsers", 186,
                        "mfaCoverage", "94%",
                        "blockedAttempts", 12
                ),
                List.of(
                        new RoleAccessRecord("QA Manager", 18, 9, "Audit Ready"),
                        new RoleAccessRecord("Warehouse Lead", 27, 14, "Compliant"),
                        new RoleAccessRecord("Production Supervisor", 35, 21, "Compliant")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

