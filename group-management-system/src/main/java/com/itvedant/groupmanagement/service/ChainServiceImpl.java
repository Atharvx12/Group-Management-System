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

    @Override
    public List<Chain> getAllChains() {
        return chainRepository.findByIsActiveTrue();
    }

    @Override
    public Chain getChainById(Integer id) {

        return chainRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Chain not found with id: " + id));
    }

    @Override
    public Chain addChain(Chain chain) {

        // Validate company name
        if (chain.getCompanyName() == null ||
                chain.getCompanyName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Company name is required");
        }

        // Validate GSTN
        if (chain.getGstnNo() == null ||
                chain.getGstnNo().trim().isEmpty()) {

            throw new RuntimeException(
                    "GSTN number is required");
        }

        // Validate Group
        if (chain.getGroup() == null ||
                chain.getGroup().getGroupId() == null) {

            throw new RuntimeException(
                    "Group is required");
        }

        // Check duplicate GSTN
        if (chainRepository.existsByGstnNo(
                chain.getGstnNo().trim())) {

            throw new RuntimeException(
                    "GSTN number already exists: "
                            + chain.getGstnNo());
        }

        // Get the actual group from database
        Group group = groupRepository.findById(
                        chain.getGroup().getGroupId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Group not found"));

        // Only active groups can be selected
        if (!Boolean.TRUE.equals(group.getIsActive())) {

            throw new RuntimeException(
                    "Selected group is not active");
        }

        chain.setCompanyName(
                chain.getCompanyName().trim());

        chain.setGstnNo(
                chain.getGstnNo().trim());

        chain.setGroup(group);
        chain.setIsActive(true);
        chain.setCreatedAt(LocalDateTime.now());
        chain.setUpdatedAt(LocalDateTime.now());

        return chainRepository.save(chain);
    }

    @Override
    public Chain updateChain(Integer id, Chain chain) {

        Chain existingChain = chainRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Chain not found with id: " + id));

        // Validate company name
        if (chain.getCompanyName() == null ||
                chain.getCompanyName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Company name is required");
        }

        // Validate GSTN
        if (chain.getGstnNo() == null ||
                chain.getGstnNo().trim().isEmpty()) {

            throw new RuntimeException(
                    "GSTN number is required");
        }

        // Validate Group
        if (chain.getGroup() == null ||
                chain.getGroup().getGroupId() == null) {

            throw new RuntimeException(
                    "Group is required");
        }

        // Check duplicate GSTN
        if (chainRepository.existsByGstnNoAndChainIdNot(
                chain.getGstnNo().trim(),
                id)) {

            throw new RuntimeException(
                    "GSTN number already exists: "
                            + chain.getGstnNo());
        }

        // Get actual group from database
        Group group = groupRepository.findById(
                        chain.getGroup().getGroupId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Group not found"));

        // Only active groups can be selected
        if (!Boolean.TRUE.equals(group.getIsActive())) {

            throw new RuntimeException(
                    "Selected group is not active");
        }

        existingChain.setCompanyName(
                chain.getCompanyName().trim());

        existingChain.setGstnNo(
                chain.getGstnNo().trim());

        existingChain.setGroup(group);

        existingChain.setUpdatedAt(
                LocalDateTime.now());

        return chainRepository.save(existingChain);
    }

    @Override
    public void deleteChain(Integer id) {

        Chain existingChain = chainRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Chain not found with id: " + id));

        // Soft delete
        existingChain.setIsActive(false);

        existingChain.setUpdatedAt(
                LocalDateTime.now());

        chainRepository.save(existingChain);
    }
}