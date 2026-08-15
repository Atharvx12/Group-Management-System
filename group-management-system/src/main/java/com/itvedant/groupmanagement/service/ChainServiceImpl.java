package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.entity.Group;
import com.itvedant.groupmanagement.repository.ChainRepository;
import com.itvedant.groupmanagement.repository.GroupRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChainServiceImpl implements ChainService {

    private final ChainRepository chainRepository;
    private final GroupRepository groupRepository;

    public ChainServiceImpl(
            ChainRepository chainRepository,
            GroupRepository groupRepository) {

        this.chainRepository = chainRepository;
        this.groupRepository = groupRepository;
    }


    // ==========================================
    // GET ALL ACTIVE CHAINS
    // ==========================================

    @Override
    public List<Chain> getAllChains() {

        return chainRepository.findByIsActiveTrue();
    }


    // ==========================================
    // GET CHAIN BY ID
    // ==========================================

    @Override
    public Chain getChainById(Integer chainId) {

        return chainRepository.findById(chainId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Chain not found with ID: "
                                        + chainId
                        )
                );
    }


    // ==========================================
    // ADD CHAIN
    // ==========================================

    @Override
    public Chain addChain(Chain chain) {

        if (chain.getChainName() == null ||
                chain.getChainName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Chain name is required"
            );
        }

        if (chain.getCompanyName() == null ||
                chain.getCompanyName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Company name is required"
            );
        }

        if (chain.getGstnNo() == null ||
                chain.getGstnNo().trim().isEmpty()) {

            throw new RuntimeException(
                    "GSTN number is required"
            );
        }

        if (chain.getGroup() == null ||
                chain.getGroup().getGroupId() == null) {

            throw new RuntimeException(
                    "Group ID is required"
            );
        }

        Group group = groupRepository.findById(
                chain.getGroup().getGroupId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Group not found with ID: "
                                + chain.getGroup().getGroupId()
                )
        );

        if (!Boolean.TRUE.equals(group.getIsActive())) {

            throw new RuntimeException(
                    "Cannot create chain for inactive group"
            );
        }

        chain.setGroup(group);
        chain.setIsActive(true);
        chain.setCreatedAt(LocalDateTime.now());
        chain.setUpdatedAt(LocalDateTime.now());

        return chainRepository.save(chain);
    }


    // ==========================================
    // UPDATE CHAIN
    // ==========================================

    @Override
    public Chain updateChain(
            Integer chainId,
            Chain chain) {

        Chain existingChain =
                chainRepository.findById(chainId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Chain not found with ID: "
                                                + chainId
                                )
                        );


        if (chain.getChainName() == null ||
                chain.getChainName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Chain name is required"
            );
        }


        if (chain.getCompanyName() == null ||
                chain.getCompanyName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Company name is required"
            );
        }


        if (chain.getGstnNo() == null ||
                chain.getGstnNo().trim().isEmpty()) {

            throw new RuntimeException(
                    "GSTN number is required"
            );
        }


        if (chain.getGroup() == null ||
                chain.getGroup().getGroupId() == null) {

            throw new RuntimeException(
                    "Group ID is required"
            );
        }


        Group group = groupRepository.findById(
                chain.getGroup().getGroupId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Group not found with ID: "
                                + chain.getGroup().getGroupId()
                )
        );


        if (!Boolean.TRUE.equals(group.getIsActive())) {

            throw new RuntimeException(
                    "Cannot assign chain to inactive group"
            );
        }


        existingChain.setChainName(
                chain.getChainName()
        );

        existingChain.setCompanyName(
                chain.getCompanyName()
        );

        existingChain.setGstnNo(
                chain.getGstnNo()
        );

        existingChain.setGroup(group);

        existingChain.setUpdatedAt(
                LocalDateTime.now()
        );


        return chainRepository.save(existingChain);
    }


    // ==========================================
    // DELETE CHAIN
    // ==========================================

    @Override
    public boolean deleteChain(Integer chainId) {

        Chain existingChain =
                chainRepository.findById(chainId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Chain not found with ID: "
                                                + chainId
                                )
                        );

        existingChain.setIsActive(false);

        existingChain.setUpdatedAt(
                LocalDateTime.now()
        );

        chainRepository.save(existingChain);

        return true;
    }


    // ==========================================
    // GET CHAINS BY GROUP
    // ==========================================

    @Override
    public List<Chain> getChainsByGroup(
            Integer groupId) {

        return chainRepository
                .findByGroup_GroupIdAndIsActiveTrue(
                        groupId
                );
    }
}