package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Invoice;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.Attachment;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class InvoiceEmailService {

    private final InvoiceService invoiceService;

    private final Resend resend;

    public InvoiceEmailService(
            InvoiceService invoiceService,
            @Value("${resend.api-key}") String apiKey) {

        this.invoiceService = invoiceService;
        this.resend = new Resend(apiKey);
    }

    public void sendInvoiceEmail(Integer invoiceId) {

        try {

            // Get invoice
            Invoice invoice =
                    invoiceService.getInvoiceById(invoiceId);

            // Check email
            String emailId =
                    invoice.getEmailId();

            if (emailId == null ||
                    emailId.trim().isEmpty()) {

                throw new RuntimeException(
                        "Email ID is required before sending invoice"
                );
            }

            // Generate invoice PDF
            byte[] pdf =
                    invoiceService.generateInvoicePdf(invoiceId);

            // Convert PDF to Base64
            String encodedPdf =
                    Base64.getEncoder().encodeToString(pdf);

            // Create PDF attachment
            Attachment attachment =
                    Attachment.builder()
                            .fileName(
                                    "Invoice-" +
                                            invoice.getInvoiceNo() +
                                            ".pdf"
                            )
                            .content(encodedPdf)
                            .build();

            // Create email
            CreateEmailOptions emailOptions =
                    CreateEmailOptions.builder()
                            .from("onboarding@resend.dev")
                            .to(emailId)
                            .subject(
                                    "Invoice - " +
                                            invoice.getInvoiceNo()
                            )
                            .html(
                                    "<h2>Invoice</h2>" +
                                    "<p>Dear Customer,</p>" +
                                    "<p>Please find your invoice attached.</p>" +
                                    "<p><strong>Invoice No:</strong> " +
                                    invoice.getInvoiceNo() +
                                    "</p>" +
                                    "<p>Thank you.</p>"
                            )
                            .addAttachment(attachment)
                            .build();

            // Send through Resend
            CreateEmailResponse response =
                    resend.emails().send(emailOptions);

            if (response == null ||
                    response.getId() == null) {

                throw new RuntimeException(
                        "Resend did not return an email ID"
                );
            }

        } catch (ResendException e) {

            throw new RuntimeException(
                    "Failed to send invoice email through Resend: " +
                            e.getMessage(),
                    e
            );
        }
    }
}