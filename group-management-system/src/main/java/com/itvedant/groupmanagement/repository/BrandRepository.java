package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BrandRepository extends JpaRepository<Brand, Integer> {

    List<Brand> findByIsActiveTrue();

    List<Brand> findByChain_ChainIdAndIsActiveTrue(Integer chainId);

    List<Brand> findByChain_Group_GroupIdAndIsActiveTrue(Integer groupId);
}