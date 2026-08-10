package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;

import java.util.List;

public interface ChainService {

    List<Chain> getAllChains();

    Chain getChainById(Integer id);

    Chain addChain(Chain chain);

    Chain updateChain(Integer id, Chain chain);

    void deleteChain(Integer id);
}