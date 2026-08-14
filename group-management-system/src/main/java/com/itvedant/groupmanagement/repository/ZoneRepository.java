package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Zone;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ZoneRepository extends JpaRepository<Zone, Integer> {

    List<Zone> findByIsActiveTrue();

    List<Zone> findByBrand_BrandIdAndIsActiveTrue(Integer brandId);

    List<Zone> findByBrand_Chain_ChainIdAndIsActiveTrue(Integer chainId);

    List<Zone> findByBrand_Chain_Group_GroupIdAndIsActiveTrue(Integer groupId);
}