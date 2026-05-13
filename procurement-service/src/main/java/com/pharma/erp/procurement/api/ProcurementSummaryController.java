package com.pharma.erp.procurement.api;

import com.pharma.erp.procurement.domain.ModuleSnapshot;
import com.pharma.erp.procurement.domain.VendorOrderRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/procurement")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ProcurementSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<VendorOrderRecord> summary() {
        return new ModuleSnapshot<>(
                "procurement-service",
                "Procurement",
                "Healthy",
                "Coordinates vendor commitments, inbound material planning, and supply risk.",
                List.of(
                        "Top 20 suppliers are maintaining a 96% on-time rate",
                        "API excipient lead-time risk is being monitored in 2 lanes",
                        "Open CAPA items with vendors dropped by 31%"
                ),
                Map.of(
                        "openPurchaseOrders", 63,
                        "onTimeDelivery", "96%",
                        "atRiskSuppliers", 2
                ),
                List.of(
                        new VendorOrderRecord("Astra Chem Labs", "PO-2026-1043", "2026-05-15", "Low"),
                        new VendorOrderRecord("Sterile Pack Systems", "PO-2026-1088", "2026-05-18", "Moderate"),
                        new VendorOrderRecord("BioSol Reagents", "PO-2026-1112", "2026-05-20", "Low")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

