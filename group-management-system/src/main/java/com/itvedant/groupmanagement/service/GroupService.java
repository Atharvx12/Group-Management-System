package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Group;
import com.itvedant.groupmanagement.repository.ChainRepository;
import com.itvedant.groupmanagement.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private ChainRepository chainRepository;

    // Get all active groups
    public List<Group> getAllGroups() {
        return groupRepository.findByIsActiveTrue();
    }

    // Add a new group
    public Group addGroup(Group group) {

        Optional<Group> existing =
                groupRepository.findByGroupName(group.getGroupName());

        if (existing.isPresent()) {
            throw new RuntimeException("Group already exists!");
        }

        return groupRepository.save(group);
    }

    // Update group
    public Group updateGroup(Integer id, Group group) {

        Group existing = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        existing.setGroupName(group.getGroupName());

        return groupRepository.save(existing);
    }

    // Soft delete group
    public void deleteGroup(Integer id) {

        // Do not allow deletion if the group has an active chain
        if (chainRepository.existsByGroup_GroupIdAndIsActiveTrue(id)) {
            throw new RuntimeException(
                    "Group cannot be deleted because it is linked with a Chain."
            );
        }

        Group group = groupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        group.setIsActive(false);

        groupRepository.save(group);
    }
}