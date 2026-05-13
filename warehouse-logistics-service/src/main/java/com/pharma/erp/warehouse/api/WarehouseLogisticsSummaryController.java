package com.pharma.erp.warehouse.api;

import com.pharma.erp.warehouse.domain.ModuleSnapshot;
import com.pharma.erp.warehouse.domain.WarehouseZoneRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/warehouse")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class WarehouseLogisticsSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<WarehouseZoneRecord> summary() {
        return new ModuleSnapshot<>(
                "warehouse-logistics-service",
                "Warehouse & Logistics",
                "Healthy",
                "Shows storage movement, cold-chain health, and dispatch zone readiness.",
                List.of(
                        "Cold-chain lanes are at 99.4% temperature compliance",
                        "Outbound dock wait time dropped below 22 minutes",
                        "Pallet scan accuracy is holding at enterprise target"
                ),
                Map.of(
                        "activeZones", 14,
                        "temperatureCompliance", "99.4%",
                        "scanAccuracy", "99.1%"
                ),
                List.of(
                        new WarehouseZoneRecord("Cold Room A", 148, "Stable", "Ready"),
                        new WarehouseZoneRecord("FG Dispatch Bay", 92, "Not Required", "Ready"),
                        new WarehouseZoneRecord("Quarantine Zone", 21, "Monitored", "Restricted")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

