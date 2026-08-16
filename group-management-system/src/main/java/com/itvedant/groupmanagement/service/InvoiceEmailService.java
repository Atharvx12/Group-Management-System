package com.itvedant.groupmanagement.service;

import com.itvedant.groupmanagement.entity.Invoice;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class InvoiceEmailService {

    private final JavaMailSender mailSender;
    private final InvoiceService invoiceService;

    public InvoiceEmailService(
            JavaMailSender mailSender,
            InvoiceService invoiceService) {

        this.mailSender = mailSender;
        this.invoiceService = invoiceService;
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

            // Generate PDF
            byte[] pdf =
                    invoiceService.generateInvoicePdf(invoiceId);

            // Create email
            MimeMessage message =
                    mailSender.createMimeMessage();

            MimeMessageHelper helper =
                    new MimeMessageHelper(
                            message,
                            true
                    );

            // Recipient
            helper.setTo(
                    emailId
            );

            // Subject
            helper.setSubject(
                    "Invoice - " +
                            invoice.getInvoiceNo()
            );

            // Email body
            helper.setText(
                    "Dear Customer,\n\n" +
                    "Please find your invoice attached with this email.\n\n" +
                    "Invoice No: " +
                    invoice.getInvoiceNo() +
                    "\n\n" +
                    "Thank you."
            );

            // Attach PDF
            helper.addAttachment(
                    "Invoice-" +
                            invoice.getInvoiceNo() +
                            ".pdf",
                    new ByteArrayResource(pdf)
            );

            // Send
            mailSender.send(message);

        } catch (MessagingException e) {

            throw new RuntimeException(
                    "Failed to send invoice email: " +
                            e.getMessage(),
                    e
            );
        }
    }
}