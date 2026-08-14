package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Brand;
import com.itvedant.groupmanagement.entity.Zone;
import com.itvedant.groupmanagement.repository.BrandRepository;
import com.itvedant.groupmanagement.repository.ZoneRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ZoneServiceImpl implements ZoneService {

    private final ZoneRepository zoneRepository;
    private final BrandRepository brandRepository;

    public ZoneServiceImpl(
            ZoneRepository zoneRepository,
            BrandRepository brandRepository) {

        this.zoneRepository = zoneRepository;
        this.brandRepository = brandRepository;
    }

    @Override
    public Zone addZone(Zone zone) {

        if (zone.getZoneName() == null ||
                zone.getZoneName().trim().isEmpty()) {

            throw new RuntimeException("Zone name is required");
        }

        if (zone.getBrand() == null ||
                zone.getBrand().getBrandId() == null) {

            throw new RuntimeException("Brand ID is required");
        }

        Brand brand = brandRepository.findById(
                zone.getBrand().getBrandId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Brand not found with ID: "
                                + zone.getBrand().getBrandId()
                )
        );

        if (!Boolean.TRUE.equals(brand.getIsActive())) {
            throw new RuntimeException("Cannot assign an inactive brand");
        }

        zone.setBrand(brand);
        zone.setIsActive(true);
        zone.setCreatedAt(LocalDateTime.now());
        zone.setUpdatedAt(LocalDateTime.now());

        return zoneRepository.save(zone);
    }

    @Override
    public List<Zone> getAllZones() {
        return zoneRepository.findByIsActiveTrue();
    }

    @Override
    public Zone getZoneById(Integer zoneId) {

        Zone zone = zoneRepository.findById(zoneId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Zone not found with ID: " + zoneId
                        )
                );

        if (!Boolean.TRUE.equals(zone.getIsActive())) {
            throw new RuntimeException(
                    "Zone is inactive with ID: " + zoneId
            );
        }

        return zone;
    }

    @Override
    public Zone updateZone(Integer zoneId, Zone zone) {

        Zone existingZone = zoneRepository.findById(zoneId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Zone not found with ID: " + zoneId
                        )
                );

        if (!Boolean.TRUE.equals(existingZone.getIsActive())) {
            throw new RuntimeException(
                    "Cannot update an inactive zone"
            );
        }

        if (zone.getZoneName() == null ||
                zone.getZoneName().trim().isEmpty()) {

            throw new RuntimeException("Zone name is required");
        }

        if (zone.getBrand() == null ||
                zone.getBrand().getBrandId() == null) {

            throw new RuntimeException("Brand ID is required");
        }

        Brand brand = brandRepository.findById(
                zone.getBrand().getBrandId()
        ).orElseThrow(() ->
                new RuntimeException(
                        "Brand not found with ID: "
                                + zone.getBrand().getBrandId()
                )
        );

        if (!Boolean.TRUE.equals(brand.getIsActive())) {
            throw new RuntimeException(
                    "Cannot assign an inactive brand"
            );
        }

        existingZone.setZoneName(zone.getZoneName());
        existingZone.setBrand(brand);
        existingZone.setUpdatedAt(LocalDateTime.now());

        return zoneRepository.save(existingZone);
    }

    @Override
    public boolean deleteZone(Integer zoneId) {

        Zone existingZone = zoneRepository.findById(zoneId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Zone not found with ID: " + zoneId
                        )
                );

        existingZone.setIsActive(false);
        existingZone.setUpdatedAt(LocalDateTime.now());

        zoneRepository.save(existingZone);

        return true;
    }

    @Override
    public List<Zone> getZonesByBrand(Integer brandId) {
        return zoneRepository
                .findByBrand_BrandIdAndIsActiveTrue(brandId);
    }

    @Override
    public List<Zone> getZonesByChain(Integer chainId) {
        return zoneRepository
                .findByBrand_Chain_ChainIdAndIsActiveTrue(chainId);
    }

    @Override
    public List<Zone> getZonesByGroup(Integer groupId) {
        return zoneRepository
                .findByBrand_Chain_Group_GroupIdAndIsActiveTrue(groupId);
    }
}