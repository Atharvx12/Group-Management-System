package com.itvedant.groupmanagement.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chain_master")
public class Chain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chain_id")
    private Integer chainId;

    @Column(name = "chain_name", nullable = false, unique = true, length = 255)
    private String chainName;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "gstn_no", unique = true, nullable = false, length = 15)
    private String gstnNo;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    public Chain() {
    }

    public Integer getChainId() {
        return chainId;
    }

    public void setChainId(Integer chainId) {
        this.chainId = chainId;
    }

    public String getChainName() {
        return chainName;
    }

    public void setChainName(String chainName) {
        this.chainName = chainName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getGstnNo() {
        return gstnNo;
    }

    public void setGstnNo(String gstnNo) {
        this.gstnNo = gstnNo;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}