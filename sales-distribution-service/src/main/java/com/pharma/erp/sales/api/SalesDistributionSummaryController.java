package com.pharma.erp.sales.api;

import com.pharma.erp.sales.domain.DistributionOrderRecord;
import com.pharma.erp.sales.domain.ModuleSnapshot;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sales")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class SalesDistributionSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<DistributionOrderRecord> summary() {
        return new ModuleSnapshot<>(
                "sales-distribution-service",
                "Sales & Distribution",
                "Healthy",
                "Tracks demand flow, dispatch readiness, and regional service execution.",
                List.of(
                        "North zone exceeded dispatch SLA for 12 straight days",
                        "Hospital channel demand is up 8.4% month over month",
                        "OTIF performance is holding above target"
                ),
                Map.of(
                        "openOrders", 248,
                        "otif", "97.1%",
                        "dailyRevenueCr", 3.8
                ),
                List.of(
                        new DistributionOrderRecord("North", 74, "6 hrs", "98%"),
                        new DistributionOrderRecord("West", 63, "8 hrs", "96%"),
                        new DistributionOrderRecord("South", 52, "5 hrs", "99%")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}
