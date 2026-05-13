package com.pharma.erp.inventory.api;

import com.pharma.erp.inventory.domain.InventoryBatchRecord;
import com.pharma.erp.inventory.domain.ModuleSnapshot;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/inventory")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class InventorySummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<InventoryBatchRecord> summary() {
        return new ModuleSnapshot<>(
                "inventory-service",
                "Inventory Control",
                "Healthy",
                "Provides batch-wise stock visibility for finished goods and regulated materials.",
                List.of(
                        "14 batches nearing reorder threshold",
                        "98.2% fill rate maintained across top movers",
                        "Cold-room inventory variance is within tolerance"
                ),
                Map.of(
                        "liveBatches", 184,
                        "fillRate", "98.2%",
                        "nearReorder", 14
                ),
                List.of(
                        new InventoryBatchRecord("Paracetamol 500mg", "PCM-2408-A", 14200, "Available"),
                        new InventoryBatchRecord("Amoxicillin 250mg", "AMX-2410-C", 8200, "Reserved"),
                        new InventoryBatchRecord("Cough Relief Syrup", "CRS-2409-B", 3900, "Low Stock")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}

