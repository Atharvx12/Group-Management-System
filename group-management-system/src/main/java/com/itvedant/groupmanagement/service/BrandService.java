package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Brand;

import java.util.List;

public interface BrandService {

    Brand addBrand(Brand brand);

    List<Brand> getAllBrands();

    Brand getBrandById(Integer brandId);

    Brand updateBrand(Integer brandId, Brand brand);

    boolean deleteBrand(Integer brandId);

    List<Brand> getBrandsByChain(Integer chainId);

    List<Brand> getBrandsByGroup(Integer groupId);
}