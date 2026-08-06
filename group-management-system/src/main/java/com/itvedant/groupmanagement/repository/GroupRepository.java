package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GroupRepository extends JpaRepository<Group, Integer> {

    Optional<Group> findByGroupName(String groupName);

    List<Group> findByIsActiveTrue();

}