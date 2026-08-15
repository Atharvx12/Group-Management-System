package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Estimate;

import java.util.List;

public interface EstimateService {

    Estimate addEstimate(Estimate estimate);

    List<Estimate> getAllEstimates();

    Estimate getEstimateById(Integer estimatedId);

    Estimate updateEstimate(Integer estimatedId, Estimate estimate);

    boolean deleteEstimate(Integer estimatedId);

    List<Estimate> getEstimatesByChain(Integer chainId);

    List<Estimate> getEstimatesByGroup(String groupName);

    List<Estimate> getEstimatesByBrand(String brandName);

    List<Estimate> getEstimatesByZone(String zoneName);
}