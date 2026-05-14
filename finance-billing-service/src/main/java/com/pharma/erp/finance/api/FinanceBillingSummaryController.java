package com.pharma.erp.finance.api;

import com.pharma.erp.finance.domain.FinanceStreamRecord;
import com.pharma.erp.finance.domain.ModuleSnapshot;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/finance")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class FinanceBillingSummaryController {

    @GetMapping("/summary")
    public ModuleSnapshot<FinanceStreamRecord> summary() {
        return new ModuleSnapshot<>(
                "finance-billing-service",
                "Finance & Billing",
                "Healthy",
                "Summarizes collections, invoice flow, payables pressure, and revenue health.",
                List.of(
                        "DSO improved by 4 days quarter over quarter",
                        "Invoice auto-posting rate has crossed 91%",
                        "No major receivables concentration risk flagged"
                ),
                Map.of(
                        "monthlyRevenueCr", 82.4,
                        "invoiceAutoPosting", "91%",
                        "payablesDueThisWeekCr", 12.8
                ),
                List.of(
                        new FinanceStreamRecord("Hospital Sales", "28.4", "0-30 days", "Low"),
                        new FinanceStreamRecord("Distributor Sales", "34.9", "31-45 days", "Moderate"),
                        new FinanceStreamRecord("Vendor Payables", "12.8", "Due This Week", "Managed")
                ),
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }
}
