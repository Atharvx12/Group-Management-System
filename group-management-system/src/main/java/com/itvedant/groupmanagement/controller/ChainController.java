package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.service.ChainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chains")
@CrossOrigin(origins = "http://localhost:3000")
public class ChainController {

    @Autowired
    private ChainService chainService;

    @GetMapping
    public List<Chain> getAllChains() {
        return chainService.getAllChains();
    }

    @PostMapping
    public Chain addChain(@RequestBody Chain chain) {
        return chainService.addChain(chain);
    }

    @PutMapping("/{id}")
    public Chain updateChain(@PathVariable Integer id,
                             @RequestBody Chain chain) {
        return chainService.updateChain(id, chain);
    }

    @DeleteMapping("/{id}")
    public String deleteChain(@PathVariable Integer id) {
        chainService.deleteChain(id);
        return "Chain deleted successfully";
    }
}