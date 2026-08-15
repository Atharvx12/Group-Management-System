package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Chain;

import java.util.List;

public interface ChainService {

    List<Chain> getAllChains();

    Chain getChainById(Integer chainId);

    Chain addChain(Chain chain);

    Chain updateChain(Integer chainId, Chain chain);

    boolean deleteChain(Integer chainId);

    List<Chain> getChainsByGroup(Integer groupId);
}