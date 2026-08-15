package com.itvedant.groupmanagement.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "invoice_master",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_invoice_no",
                        columnNames = "invoice_no"
                )
        }
)
public class Invoice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    // ==========================================
    // INVOICE NUMBER
    // ==========================================

    @Column(
            name = "invoice_no",
            nullable = false,
            unique = true
    )
    private Integer invoiceNo;

    // ==========================================
    // ESTIMATE
    // ==========================================

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "estimated_id",
            nullable = false
    )
    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })
    private Estimate estimate;

    // ==========================================
    // CHAIN
    // ==========================================

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "chain_id",
            nullable = false
    )
    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler",
            "group"
    })
    private Chain chain;

    // ==========================================
    // SERVICE DETAILS
    // ==========================================

    @Column(
            name = "service_details",
            nullable = false,
            length = 100
    )
    private String serviceDetails;

    // ==========================================
    // QUANTITY
    // ==========================================

    @Column(
            name = "qty",
            nullable = false
    )
    private Integer qty;

    // ==========================================
    // COST PER QUANTITY
    // ==========================================

    @Column(
            name = "cost_per_qty",
            nullable = false
    )
    private Double costPerQty;

    // ==========================================
    // AMOUNT PAYABLE
    // ==========================================

    @Column(
            name = "amount_payable",
            nullable = false
    )
    private Double amountPayable;

    // ==========================================
    // AMOUNT PAID
    // ==========================================

    @Column(
            name = "amount_paid",
            nullable = false
    )
    private Double amountPaid;

    // ==========================================
    // BALANCE
    // ==========================================

    @Column(
            name = "balance",
            nullable = false
    )
    private Double balance;

    // ==========================================
    // DATE OF PAYMENT
    // ==========================================

    @Column(name = "date_of_payment")
    private LocalDateTime dateOfPayment;

    // ==========================================
    // DATE OF SERVICE
    // ==========================================

    @Column(
            name = "date_of_service",
            nullable = false
    )
    private LocalDate dateOfService;

    // ==========================================
    // DELIVERY DETAILS
    // ==========================================

    @Column(
            name = "delivery_details",
            length = 100
    )
    private String deliveryDetails;

    // ==========================================
    // EMAIL ID
    // ==========================================

    @Column(
            name = "email_id",
            length = 100
    )
    private String emailId;

    // ==========================================
    // CREATED / UPDATED
    // ==========================================

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ==========================================
    // CONSTRUCTOR
    // ==========================================

    public Invoice() {
    }

    // ==========================================
    // GETTERS / SETTERS
    // ==========================================

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getInvoiceNo() {
        return invoiceNo;
    }

    public void setInvoiceNo(Integer invoiceNo) {
        this.invoiceNo = invoiceNo;
    }

    public Estimate getEstimate() {
        return estimate;
    }

    public void setEstimate(Estimate estimate) {
        this.estimate = estimate;
    }

    public Chain getChain() {
        return chain;
    }

    public void setChain(Chain chain) {
        this.chain = chain;
    }

    public String getServiceDetails() {
        return serviceDetails;
    }

    public void setServiceDetails(String serviceDetails) {
        this.serviceDetails = serviceDetails;
    }

    public Integer getQty() {
        return qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public Double getCostPerQty() {
        return costPerQty;
    }

    public void setCostPerQty(Double costPerQty) {
        this.costPerQty = costPerQty;
    }

    public Double getAmountPayable() {
        return amountPayable;
    }

    public void setAmountPayable(Double amountPayable) {
        this.amountPayable = amountPayable;
    }

    public Double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(Double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public LocalDateTime getDateOfPayment() {
        return dateOfPayment;
    }

    public void setDateOfPayment(LocalDateTime dateOfPayment) {
        this.dateOfPayment = dateOfPayment;
    }

    public LocalDate getDateOfService() {
        return dateOfService;
    }

    public void setDateOfService(LocalDate dateOfService) {
        this.dateOfService = dateOfService;
    }

    public String getDeliveryDetails() {
        return deliveryDetails;
    }

    public void setDeliveryDetails(String deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
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

    // ==========================================
    // JPA CALLBACKS
    // ==========================================

    @PrePersist
    public void onCreate() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}