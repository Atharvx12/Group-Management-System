package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.entity.Estimate;
import com.itvedant.groupmanagement.repository.ChainRepository;
import com.itvedant.groupmanagement.repository.EstimateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EstimateServiceImpl implements EstimateService {

    private final EstimateRepository estimateRepository;
    private final ChainRepository chainRepository;

    public EstimateServiceImpl(
            EstimateRepository estimateRepository,
            ChainRepository chainRepository) {

        this.estimateRepository = estimateRepository;
        this.chainRepository = chainRepository;
    }

    @Override
    public Estimate addEstimate(Estimate estimate) {

        validateEstimate(estimate);

        if (estimate.getChain() == null ||
                estimate.getChain().getChainId() == null) {

            throw new RuntimeException("Chain ID is required");
        }

        Chain chain = chainRepository.findById(
                estimate.getChain().getChainId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Chain not found with ID: "
                                + estimate.getChain().getChainId()
                )
        );

        if (!Boolean.TRUE.equals(chain.getIsActive())) {
            throw new RuntimeException(
                    "Cannot create estimate for an inactive chain"
            );
        }

        estimate.setChain(chain);

        estimate.setTotalCost(
                estimate.getQty() * estimate.getCostPerUnit()
        );

        estimate.setCreatedAt(LocalDateTime.now());
        estimate.setUpdatedAt(LocalDateTime.now());

        return estimateRepository.save(estimate);
    }

    @Override
    public List<Estimate> getAllEstimates() {

        return estimateRepository.findAll();
    }

    @Override
    public Estimate getEstimateById(Integer estimatedId) {

        return estimateRepository.findById(estimatedId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Estimate not found with ID: "
                                        + estimatedId
                        )
                );
    }

    @Override
    public Estimate updateEstimate(
            Integer estimatedId,
            Estimate estimate) {

        Estimate existingEstimate =
                estimateRepository.findById(estimatedId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Estimate not found with ID: "
                                                + estimatedId
                                )
                        );

        validateEstimate(estimate);

        if (estimate.getChain() == null ||
                estimate.getChain().getChainId() == null) {

            throw new RuntimeException("Chain ID is required");
        }

        Chain chain = chainRepository.findById(
                estimate.getChain().getChainId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Chain not found with ID: "
                                + estimate.getChain().getChainId()
                )
        );

        if (!Boolean.TRUE.equals(chain.getIsActive())) {
            throw new RuntimeException(
                    "Cannot assign an inactive chain"
            );
        }

        existingEstimate.setChain(chain);

        existingEstimate.setGroupName(
                estimate.getGroupName()
        );

        existingEstimate.setBrandName(
                estimate.getBrandName()
        );

        existingEstimate.setZoneName(
                estimate.getZoneName()
        );

        existingEstimate.setService(
                estimate.getService()
        );

        existingEstimate.setQty(
                estimate.getQty()
        );

        existingEstimate.setCostPerUnit(
                estimate.getCostPerUnit()
        );

        existingEstimate.setTotalCost(
                estimate.getQty()
                        * estimate.getCostPerUnit()
        );

        existingEstimate.setDeliveryDate(
                estimate.getDeliveryDate()
        );

        existingEstimate.setDeliveryDetails(
                estimate.getDeliveryDetails()
        );

        existingEstimate.setUpdatedAt(
                LocalDateTime.now()
        );

        return estimateRepository.save(existingEstimate);
    }

    @Override
    public boolean deleteEstimate(Integer estimatedId) {

        Estimate existingEstimate =
                estimateRepository.findById(estimatedId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Estimate not found with ID: "
                                                + estimatedId
                                )
                        );

        estimateRepository.delete(existingEstimate);

        return true;
    }

    @Override
    public List<Estimate> getEstimatesByChain(
            Integer chainId) {

        return estimateRepository
                .findByChain_ChainId(chainId);
    }

    @Override
    public List<Estimate> getEstimatesByGroup(
            String groupName) {

        return estimateRepository
                .findByGroupName(groupName);
    }

    @Override
    public List<Estimate> getEstimatesByBrand(
            String brandName) {

        return estimateRepository
                .findByBrandName(brandName);
    }

    @Override
    public List<Estimate> getEstimatesByZone(
            String zoneName) {

        return estimateRepository
                .findByZoneName(zoneName);
    }

    private void validateEstimate(Estimate estimate) {

        if (estimate.getGroupName() == null ||
                estimate.getGroupName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Group name is required"
            );
        }

        if (estimate.getBrandName() == null ||
                estimate.getBrandName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Brand name is required"
            );
        }

        if (estimate.getZoneName() == null ||
                estimate.getZoneName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Zone name is required"
            );
        }

        if (estimate.getService() == null ||
                estimate.getService().trim().isEmpty()) {

            throw new RuntimeException(
                    "Service is required"
            );
        }

        if (estimate.getQty() == null ||
                estimate.getQty() <= 0) {

            throw new RuntimeException(
                    "Quantity must be greater than zero"
            );
        }

        if (estimate.getCostPerUnit() == null ||
                estimate.getCostPerUnit() < 0) {

            throw new RuntimeException(
                    "Cost per unit cannot be negative"
            );
        }

        if (estimate.getDeliveryDate() == null) {

            throw new RuntimeException(
                    "Delivery date is required"
            );
        }
    }
}