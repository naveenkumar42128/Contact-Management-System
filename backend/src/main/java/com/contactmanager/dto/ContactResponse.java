package com.contactmanager.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ContactResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String company;
    private String notes;
    private String profileImage;
    private LocalDateTime createdAt;
}
