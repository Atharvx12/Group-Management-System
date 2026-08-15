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


    // ==========================================
    // GET ALL ACTIVE CHAINS
    // ==========================================

    @GetMapping
    public ResponseEntity<List<Chain>> getAllChains() {

        return ResponseEntity.ok(
                chainService.getAllChains()
        );
    }


    // ==========================================
    // GET CHAINS BY GROUP
    // ==========================================

    @GetMapping("/group/{groupId}")
    public ResponseEntity<List<Chain>> getChainsByGroup(
            @PathVariable Integer groupId) {

        return ResponseEntity.ok(
                chainService.getChainsByGroup(groupId)
        );
    }


    // ==========================================
    // GET CHAIN BY ID
    // ==========================================

    @GetMapping("/{id}")
    public ResponseEntity<Chain> getChainById(
            @PathVariable Integer id) {

        return ResponseEntity.ok(
                chainService.getChainById(id)
        );
    }


    // ==========================================
    // ADD CHAIN
    // ==========================================

    @PostMapping
    public ResponseEntity<Chain> addChain(
            @RequestBody Chain chain) {

        return ResponseEntity.ok(
                chainService.addChain(chain)
        );
    }


    // ==========================================
    // UPDATE CHAIN
    // ==========================================

    @PutMapping("/{id}")
    public ResponseEntity<Chain> updateChain(
            @PathVariable Integer id,
            @RequestBody Chain chain) {

        return ResponseEntity.ok(
                chainService.updateChain(id, chain)
        );
    }


    // ==========================================
    // DELETE CHAIN
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteChain(
            @PathVariable Integer id) {

        chainService.deleteChain(id);

        return ResponseEntity.ok(
                "Chain deleted successfully"
        );
    }
}