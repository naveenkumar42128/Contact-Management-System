package com.contactmanager.service;

import com.contactmanager.dto.ContactRequest;
import com.contactmanager.dto.ContactResponse;
import com.contactmanager.entity.Contact;
import com.contactmanager.entity.User;
import com.contactmanager.exception.ResourceNotFoundException;
import com.contactmanager.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactRepository contactRepository;

    public Page<ContactResponse> getContacts(User user, String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Contact> contacts = (search != null && !search.isBlank())
                ? contactRepository.searchByUser(user, search, pageable)
                : contactRepository.findByUser(user, pageable);
        return contacts.map(this::toResponse);
    }

    public ContactResponse getContact(User user, Long id) {
        return toResponse(findContactByUser(user, id));
    }

    public ContactResponse createContact(User user, ContactRequest request) {
        Contact contact = Contact.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .company(request.getCompany())
                .notes(request.getNotes())
                .user(user)
                .build();
        return toResponse(contactRepository.save(contact));
    }

    public ContactResponse updateContact(User user, Long id, ContactRequest request) {
        Contact contact = findContactByUser(user, id);
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setAddress(request.getAddress());
        contact.setCompany(request.getCompany());
        contact.setNotes(request.getNotes());
        return toResponse(contactRepository.save(contact));
    }

    public void deleteContact(User user, Long id) {
        contactRepository.delete(findContactByUser(user, id));
    }

    public String exportToCsv(User user) {
        List<Contact> contacts = contactRepository.findByUser(user, Pageable.unpaged()).getContent();
        StringBuilder csv = new StringBuilder("ID,Name,Email,Phone,Address,Company,Notes,Created At\n");
        contacts.forEach(c -> csv.append(String.format("%d,%s,%s,%s,%s,%s,%s,%s\n",
                c.getId(), c.getName(), nullSafe(c.getEmail()), nullSafe(c.getPhone()),
                nullSafe(c.getAddress()), nullSafe(c.getCompany()),
                nullSafe(c.getNotes()), c.getCreatedAt())));
        return csv.toString();
    }

    private Contact findContactByUser(User user, Long id) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found with id: " + id));
        if (!contact.getUser().getId().equals(user.getId())) {
            throw new ResourceNotFoundException("Contact not found with id: " + id);
        }
        return contact;
    }

    private ContactResponse toResponse(Contact c) {
        return ContactResponse.builder()
                .id(c.getId())
                .name(c.getName())
                .email(c.getEmail())
                .phone(c.getPhone())
                .address(c.getAddress())
                .company(c.getCompany())
                .notes(c.getNotes())
                .profileImage(c.getProfileImage())
                .createdAt(c.getCreatedAt())
                .build();
    }

    private String nullSafe(String val) { return val == null ? "" : val; }
}
