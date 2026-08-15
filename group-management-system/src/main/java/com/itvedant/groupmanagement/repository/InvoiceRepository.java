package com.itvedant.groupmanagement.repository;

import com.itvedant.groupmanagement.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends JpaRepository<Invoice, Integer> {

    Optional<Invoice> findByInvoiceNo(Integer invoiceNo);

    boolean existsByInvoiceNo(Integer invoiceNo);

    boolean existsByEstimate_EstimatedId(Integer estimatedId);

    Optional<Invoice> findByEstimate_EstimatedId(Integer estimatedId);

    List<Invoice> findByChain_ChainId(Integer chainId);

    List<Invoice> findByChain_CompanyNameContainingIgnoreCase(
            String companyName
    );

    List<Invoice> findByChain_ChainIdAndInvoiceNo(
            Integer chainId,
            Integer invoiceNo
    );
}