package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Zone;

import java.util.List;

public interface ZoneService {

    Zone addZone(Zone zone);

    List<Zone> getAllZones();

    Zone getZoneById(Integer zoneId);

    Zone updateZone(Integer zoneId, Zone zone);

    boolean deleteZone(Integer zoneId);

    List<Zone> getZonesByBrand(Integer brandId);

    List<Zone> getZonesByChain(Integer chainId);

    List<Zone> getZonesByGroup(Integer groupId);
}