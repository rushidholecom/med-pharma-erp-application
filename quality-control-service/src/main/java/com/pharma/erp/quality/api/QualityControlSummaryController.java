package com.pharma.erp.quality.api;

import com.pharma.erp.quality.domain.ModuleSnapshot;
import com.pharma.erp.quality.domain.QualityBatchRecord;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/quality")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class QualityControlSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<QualityBatchRecord> summary() {
        return new ModuleSnapshot<>(
                "quality-control-service",
                "Quality Control",
                "Healthy",
                "Surfaces release decisions, deviations, and quality gate pressure for batches.",
                List.of(
                        "First-pass release rate is at 93%",
                        "Deviation backlog has been cut to single digits",
                        "Microbiology queue is within target turnaround"
                ),
                Map.of(
                        "reviewBatches", 17,
                        "firstPassRelease", "93%",
                        "openDeviations", 8
                ),
                List.of(
                        new QualityBatchRecord("PCM-2408-A", "Released", 0, "4 hrs"),
                        new QualityBatchRecord("AMX-2410-C", "Under Review", 2, "12 hrs"),
                        new QualityBatchRecord("CRS-2409-B", "Hold", 1, "8 hrs")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}
