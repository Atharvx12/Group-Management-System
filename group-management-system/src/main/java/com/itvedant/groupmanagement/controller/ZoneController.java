package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Zone;
import com.itvedant.groupmanagement.service.ZoneService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/zones")
@CrossOrigin(origins = "http://localhost:3000")
public class ZoneController {

    private final ZoneService zoneService;

    public ZoneController(ZoneService zoneService) {
        this.zoneService = zoneService;
    }

    @GetMapping
    public ResponseEntity<List<Zone>> getAllZones() {
        return ResponseEntity.ok(
                zoneService.getAllZones()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Zone> getZoneById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                zoneService.getZoneById(id)
        );
    }

    @PostMapping
    public ResponseEntity<Zone> addZone(
            @RequestBody Zone zone) {

        return ResponseEntity.ok(
                zoneService.addZone(zone)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<Zone> updateZone(
            @PathVariable Integer id,
            @RequestBody Zone zone) {

        return ResponseEntity.ok(
                zoneService.updateZone(id, zone)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteZone(
            @PathVariable Integer id) {

        zoneService.deleteZone(id);

        return ResponseEntity.ok(
                "Zone deleted successfully"
        );
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<List<Zone>> getZonesByBrand(
            @PathVariable Integer brandId) {

        return ResponseEntity.ok(
                zoneService.getZonesByBrand(brandId)
        );
    }

    @GetMapping("/chain/{chainId}")
    public ResponseEntity<List<Zone>> getZonesByChain(
            @PathVariable Integer chainId) {

        return ResponseEntity.ok(
                zoneService.getZonesByChain(chainId)
        );
    }

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<Zone>> getZonesByGroup(
            @PathVariable Integer groupId) {

        return ResponseEntity.ok(
                zoneService.getZonesByGroup(groupId)
        );
    }
}