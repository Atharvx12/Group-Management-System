package com.itvedant.groupmanagement.controller;

import com.itvedant.groupmanagement.entity.Group;
import com.itvedant.groupmanagement.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@CrossOrigin(
        origins = "https://zippy-puppy-d1a517.netlify.app",
        allowedHeaders = "*",
        methods = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PUT,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    @PostMapping
    public Group addGroup(@RequestBody Group group) {
        return groupService.addGroup(group);
    }

    @PutMapping("/{id}")
    public Group updateGroup(
            @PathVariable Integer id,
            @RequestBody Group group
    ) {
        return groupService.updateGroup(id, group);
    }

    @DeleteMapping("/{id}")
    public String deleteGroup(@PathVariable Integer id) {
        groupService.deleteGroup(id);
        return "Group deleted successfully";
    }
}