package com.pharma.erp.warehouse.api;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClient;

@RestController
@RequestMapping("/system")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class ServiceNetworkController {

    private final String currentServiceName;
    private final PeerServicesProperties peerServicesProperties;
    private final RestClient restClient;

    public ServiceNetworkController(
            @Value("${spring.application.name}") String currentServiceName,
            PeerServicesProperties peerServicesProperties,
            RestClient.Builder restClientBuilder
    ) {
        this.currentServiceName = currentServiceName;
        this.peerServicesProperties = peerServicesProperties;
        this.restClient = restClientBuilder.build();
    }

    @GetMapping("/peers")
    public ServiceNetworkView peers() {
        List<PeerConnectionStatus> peers = peerServicesProperties.entrySet().stream()
                .filter(entry -> !entry.getKey().equals(currentServiceName))
                .map(entry -> probePeer(entry.getKey(), entry.getValue().getBaseUrl()))
                .toList();

        long reachablePeers = peers.stream()
                .filter(PeerConnectionStatus::reachable)
                .count();

        return new ServiceNetworkView(
                currentServiceName,
                peers.size(),
                reachablePeers,
                peers,
                OffsetDateTime.now(ZoneOffset.UTC).toString()
        );
    }

    private PeerConnectionStatus probePeer(String serviceName, String baseUrl) {
        String normalizedBaseUrl = normalizeBaseUrl(baseUrl);

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> healthResponse = restClient.get()
                    .uri(normalizedBaseUrl + "/actuator/health")
                    .retrieve()
                    .body(Map.class);

            String status = String.valueOf(healthResponse.getOrDefault("status", "UNKNOWN"));
            return new PeerConnectionStatus(serviceName, normalizedBaseUrl, "UP".equalsIgnoreCase(status), status, null);
        } catch (Exception exception) {
            return new PeerConnectionStatus(
                    serviceName,
                    normalizedBaseUrl,
                    false,
                    "DOWN",
                    exception.getClass().getSimpleName() + ": " + exception.getMessage()
            );
        }
    }

    private String normalizeBaseUrl(String baseUrl) {
        return baseUrl.endsWith("/") ? baseUrl.substring(0, baseUrl.length() - 1) : baseUrl;
    }
}

@Component
@ConfigurationProperties(prefix = "services")
class PeerServicesProperties extends LinkedHashMap<String, ServiceEndpointProperties> {
}

class ServiceEndpointProperties {

    private String baseUrl;

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }
}

record ServiceNetworkView(
        String currentService,
        int totalPeers,
        long reachablePeers,
        List<PeerConnectionStatus> peers,
        String lastChecked
) {
}

record PeerConnectionStatus(
        String serviceName,
        String baseUrl,
        boolean reachable,
        String status,
        String error
) {
}
