package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.service.ChainService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chains")
@CrossOrigin(origins = "http://localhost:3000")
public class ChainController {

    private final ChainService chainService;

    public ChainController(ChainService chainService) {
        this.chainService = chainService;
    }

    // Get all active chains
    @GetMapping
    public ResponseEntity<List<Chain>> getAllChains() {
        return ResponseEntity.ok(
                chainService.getAllChains()
        );
    }

    // Get chain by ID
    @GetMapping("/{id}")
    public ResponseEntity<Chain> getChainById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                chainService.getChainById(id)
        );
    }

    // Add new chain/company
    @PostMapping
    public ResponseEntity<Chain> addChain(
            @RequestBody Chain chain) {

        return ResponseEntity.ok(
                chainService.addChain(chain)
        );
    }

    // Update chain/company
    @PutMapping("/{id}")
    public ResponseEntity<Chain> updateChain(
            @PathVariable Integer id,
            @RequestBody Chain chain) {

        return ResponseEntity.ok(
                chainService.updateChain(id, chain)
        );
    }

    // Soft delete chain/company
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChain(
            @PathVariable Integer id) {

        chainService.deleteChain(id);

        return ResponseEntity.ok(
                "Chain deleted successfully"
        );
    }
}