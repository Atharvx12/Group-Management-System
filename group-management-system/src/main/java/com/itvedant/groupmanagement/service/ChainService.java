package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.repository.ChainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChainService {

    @Autowired
    private ChainRepository chainRepository;

    public List<Chain> getAllChains() {
        return chainRepository.findByIsActiveTrue();
    }

    public Chain addChain(Chain chain) {

        Optional<Chain> existing =
                chainRepository.findByChainName(chain.getChainName());

        if (existing.isPresent()) {
            throw new RuntimeException("Chain already exists!");
        }

        return chainRepository.save(chain);
    }

    public Chain updateChain(Integer id, Chain chain) {

        Chain existing = chainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        existing.setChainName(chain.getChainName());
        existing.setGroup(chain.getGroup());

        return chainRepository.save(existing);
    }

    public void deleteChain(Integer id) {

        Chain chain = chainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chain not found"));

        chain.setIsActive(false);

        chainRepository.save(chain);
    }
}