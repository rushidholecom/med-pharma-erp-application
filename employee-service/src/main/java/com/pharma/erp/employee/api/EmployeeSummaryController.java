package com.pharma.erp.employee.api;

import com.pharma.erp.employee.domain.ModuleSnapshot;
import com.pharma.erp.employee.domain.TeamReadinessRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/employees")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class EmployeeSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<TeamReadinessRecord> summary() {
        return new ModuleSnapshot<>(
                "employee-service",
                "Workforce Readiness",
                "Healthy",
                "Monitors staffing strength, GMP training, and inspection readiness.",
                List.of(
                        "Training completion crossed 97% this week",
                        "Critical shift vacancies reduced to 2 roles",
                        "Regulatory onboarding SLA is under 48 hours"
                ),
                Map.of(
                        "headcount", 428,
                        "trainingCompletion", "97%",
                        "openCriticalRoles", 2
                ),
                List.of(
                        new TeamReadinessRecord("Production", 92, "98%", "Low"),
                        new TeamReadinessRecord("Quality Assurance", 44, "100%", "Low"),
                        new TeamReadinessRecord("Warehouse", 58, "95%", "Moderate")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

