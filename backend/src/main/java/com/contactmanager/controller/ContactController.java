package com.contactmanager.controller;

import com.contactmanager.dto.ContactRequest;
import com.contactmanager.dto.ContactResponse;
import com.contactmanager.entity.User;
import com.contactmanager.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @GetMapping
    public ResponseEntity<Page<ContactResponse>> getContacts(
            @AuthenticationPrincipal User user,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(contactService.getContacts(user, search, page, size));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactResponse> getContact(@AuthenticationPrincipal User user,
                                                       @PathVariable Long id) {
        return ResponseEntity.ok(contactService.getContact(user, id));
    }

    @PostMapping
    public ResponseEntity<ContactResponse> createContact(@AuthenticationPrincipal User user,
                                                          @Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.createContact(user, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContactResponse> updateContact(@AuthenticationPrincipal User user,
                                                          @PathVariable Long id,
                                                          @Valid @RequestBody ContactRequest request) {
        return ResponseEntity.ok(contactService.updateContact(user, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@AuthenticationPrincipal User user,
                                               @PathVariable Long id) {
        contactService.deleteContact(user, id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportCsv(@AuthenticationPrincipal User user) {
        String csv = contactService.exportToCsv(user);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=contacts.csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(csv.getBytes());
    }
}
