package com.contactmanager.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ContactRequest {
    @NotBlank
    private String name;

    @Email
    private String email;

    private String phone;
    private String address;
    private String company;
    private String notes;
}
