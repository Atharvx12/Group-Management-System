package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Chain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChainRepository extends JpaRepository<Chain, Integer> {

    // Get all active chains/companies
    List<Chain> findByIsActiveTrue();

    // Find a chain/company using GST number
    Optional<Chain> findByGstnNo(String gstnNo);

    // Check whether GST number already exists
    boolean existsByGstnNo(String gstnNo);

    // Check duplicate GST number while updating
    boolean existsByGstnNoAndChainIdNot(String gstnNo, Integer chainId);

    // Check whether an active chain exists for a group
    boolean existsByGroup_GroupIdAndIsActiveTrue(Integer groupId);

    // Get all active chains belonging to a particular group
    List<Chain> findByGroup_GroupIdAndIsActiveTrue(Integer groupId);
}