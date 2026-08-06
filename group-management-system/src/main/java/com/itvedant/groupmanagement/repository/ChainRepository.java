package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Chain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChainRepository extends JpaRepository<Chain, Integer> {

    Optional<Chain> findByChainName(String chainName);

    List<Chain> findByIsActiveTrue();

    boolean existsByGroup_GroupIdAndIsActiveTrue(Integer groupId);

}