package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Estimate;
import com.itvedant.groupmanagement.service.EstimateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estimates")
@CrossOrigin(origins = "http://localhost:3000")
public class EstimateController {

    private final EstimateService estimateService;

    public EstimateController(EstimateService estimateService) {
        this.estimateService = estimateService;
    }

    @GetMapping
    public ResponseEntity<List<Estimate>> getAllEstimates() {
        return ResponseEntity.ok(
                estimateService.getAllEstimates()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Estimate> getEstimateById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                estimateService.getEstimateById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Estimate> addEstimate(
            @RequestBody Estimate estimate) {

        return ResponseEntity.ok(
                estimateService.addEstimate(estimate)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Estimate> updateEstimate(
            @PathVariable Integer id,
            @RequestBody Estimate estimate) {

        return ResponseEntity.ok(
                estimateService.updateEstimate(id, estimate)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEstimate(
            @PathVariable Integer id) {

        estimateService.deleteEstimate(id);

        return ResponseEntity.ok(
                "Estimate deleted successfully"
        );
    }

    @GetMapping("/chain/{chainId}")
    public ResponseEntity<List<Estimate>> getEstimatesByChain(
            @PathVariable Integer chainId) {

        return ResponseEntity.ok(
                estimateService.getEstimatesByChain(chainId)
        );
    }

    @GetMapping("/group/{groupName}")
    public ResponseEntity<List<Estimate>> getEstimatesByGroup(
            @PathVariable String groupName) {

        return ResponseEntity.ok(
                estimateService.getEstimatesByGroup(groupName)
        );
    }

    @GetMapping("/brand/{brandName}")
    public ResponseEntity<List<Estimate>> getEstimatesByBrand(
            @PathVariable String brandName) {

        return ResponseEntity.ok(
                estimateService.getEstimatesByBrand(brandName)
        );
    }

    @GetMapping("/zone/{zoneName}")
    public ResponseEntity<List<Estimate>> getEstimatesByZone(
            @PathVariable String zoneName) {

        return ResponseEntity.ok(
                estimateService.getEstimatesByZone(zoneName)
        );
    }
}