package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Brand;
import com.itvedant.groupmanagement.entity.Chain;
import com.itvedant.groupmanagement.repository.BrandRepository;
import com.itvedant.groupmanagement.repository.ChainRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    private final BrandRepository brandRepository;
    private final ChainRepository chainRepository;

    public BrandServiceImpl(
            BrandRepository brandRepository,
            ChainRepository chainRepository) {

        this.brandRepository = brandRepository;
        this.chainRepository = chainRepository;
    }

    @Override
    public Brand addBrand(Brand brand) {

        if (brand.getChain() == null ||
                brand.getChain().getChainId() == null) {

            throw new RuntimeException("Chain ID is required");
        }

        Chain chain = chainRepository.findById(
                brand.getChain().getChainId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Chain not found with ID: "
                                + brand.getChain().getChainId()
                )
        );

        brand.setChain(chain);
        brand.setIsActive(true);
        brand.setCreatedAt(LocalDateTime.now());
        brand.setUpdatedAt(LocalDateTime.now());

        return brandRepository.save(brand);
    }

    @Override
    public List<Brand> getAllBrands() {
        return brandRepository.findByIsActiveTrue();
    }

    @Override
    public Brand getBrandById(Integer brandId) {

        Brand brand = brandRepository.findById(brandId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Brand not found with ID: " + brandId
                        )
                );

        if (!Boolean.TRUE.equals(brand.getIsActive())) {
            throw new RuntimeException(
                    "Brand is inactive with ID: " + brandId
            );
        }

        return brand;
    }

    @Override
    public Brand updateBrand(Integer brandId, Brand brand) {

        Brand existingBrand = brandRepository.findById(brandId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Brand not found with ID: " + brandId
                        )
                );

        if (!Boolean.TRUE.equals(existingBrand.getIsActive())) {
            throw new RuntimeException("Cannot update an inactive brand");
        }

        existingBrand.setBrandName(brand.getBrandName());

        if (brand.getChain() == null ||
                brand.getChain().getChainId() == null) {

            throw new RuntimeException("Chain ID is required");
        }

        Chain chain = chainRepository.findById(
                brand.getChain().getChainId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Chain not found with ID: "
                                + brand.getChain().getChainId()
                )
        );

        existingBrand.setChain(chain);
        existingBrand.setUpdatedAt(LocalDateTime.now());

        return brandRepository.save(existingBrand);
    }

    @Override
    public boolean deleteBrand(Integer brandId) {

        Brand existingBrand = brandRepository.findById(brandId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Brand not found with ID: " + brandId
                        )
                );

        existingBrand.setIsActive(false);
        existingBrand.setUpdatedAt(LocalDateTime.now());

        brandRepository.save(existingBrand);

        return true;
    }

    @Override
    public List<Brand> getBrandsByChain(Integer chainId) {
        return brandRepository
                .findByChain_ChainIdAndIsActiveTrue(chainId);
    }

    @Override
    public List<Brand> getBrandsByGroup(Integer groupId) {
        return brandRepository
                .findByChain_Group_GroupIdAndIsActiveTrue(groupId);
    }
}