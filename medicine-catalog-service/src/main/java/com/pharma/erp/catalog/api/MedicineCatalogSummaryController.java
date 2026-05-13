package com.pharma.erp.catalog.api;

import com.pharma.erp.catalog.domain.MedicineRecord;
import com.pharma.erp.catalog.domain.ModuleSnapshot;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/catalog")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class MedicineCatalogSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<MedicineRecord> summary() {
        return new ModuleSnapshot<>(
                "medicine-catalog-service",
                "Medicine Catalog",
                "Healthy",
                "Maintains product master data for formulations, SKUs, and market availability.",
                List.of(
                        "34 new SKUs approved for distributor rollout",
                        "Label revision cycle time reduced by 18%",
                        "No inactive product mismatches in the latest audit"
                ),
                Map.of(
                        "activeSkus", 612,
                        "marketedBrands", 74,
                        "pendingApprovals", 9
                ),
                List.of(
                        new MedicineRecord("PCM-500-TAB", "Paracetamol 500mg", "Tablet", "Marketed"),
                        new MedicineRecord("AMX-250-CAP", "Amoxicillin 250mg", "Capsule", "Validation"),
                        new MedicineRecord("ORS-CLN-SYP", "ORS Clean Syrup", "Syrup", "Marketed")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

