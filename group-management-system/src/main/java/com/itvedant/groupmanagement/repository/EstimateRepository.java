package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Estimate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EstimateRepository extends JpaRepository<Estimate, Integer> {

    List<Estimate> findByChain_ChainId(Integer chainId);

    List<Estimate> findByGroupName(String groupName);

    List<Estimate> findByBrandName(String brandName);

    List<Estimate> findByZoneName(String zoneName);
}