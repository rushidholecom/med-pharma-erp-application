package com.pharma.erp.production.api;

import com.pharma.erp.production.domain.ModuleSnapshot;
import com.pharma.erp.production.domain.ProductionLotRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/production")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProductionBatchSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<ProductionLotRecord> summary() {
        return new ModuleSnapshot<>(
                "production-batch-service",
                "Production & Batch",
                "Healthy",
                "Follows lot execution, line throughput, and work order completion across plants.",
                List.of(
                        "Line 3 utilization improved to 89%",
                        "Batch release cycle time is down by 11%",
                        "Only 1 work order is behind schedule"
                ),
                Map.of(
                        "activeLots", 31,
                        "lineUtilization", "89%",
                        "delayedOrders", 1
                ),
                List.of(
                        new ProductionLotRecord("LOT-P500-2401", "Granulation Line 1", 180000, "92%"),
                        new ProductionLotRecord("LOT-AMX-2404", "Capsule Line 2", 96000, "84%"),
                        new ProductionLotRecord("LOT-SYP-2412", "Syrup Line 1", 42000, "97%")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}
