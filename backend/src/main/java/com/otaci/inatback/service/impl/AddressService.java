package com.otaci.inatback.service.impl;

import com.otaci.inatback.dto.AddressCreateRequest;
import com.otaci.inatback.dto.AddressResponse;
import com.otaci.inatback.entity.Address;
import com.otaci.inatback.entity.User;
import com.otaci.inatback.exception.custom.ResourceNotFoundException;
import com.otaci.inatback.repository.AddressRepository;
import com.otaci.inatback.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    public AddressResponse addAddress(AddressCreateRequest request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Address address = Address.builder()
                .user(user)
                .title(request.title())
                .fullName(request.fullName())
                .phone(request.phone())
                .city(request.city())
                .district(request.district())
                .neighborhood(request.neighborhood())
                .addressLine(request.addressLine())
                .postalCode(request.postalCode())
                .corporate(request.corporate())
                .build();

        addressRepository.save(address);

        return mapToResponse(address);
    }

    public List<AddressResponse> getMyAddresses(Long userId) {
        return addressRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private AddressResponse mapToResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getTitle(),
                address.getFullName(),
                address.getPhone(),
                address.getCity(),
                address.getDistrict(),
                address.getNeighborhood(),
                address.getAddressLine(),
                address.getPostalCode()
        );
    }
    public void deleteAddress(Long addressId, Long userId) {
        Address address = addressRepository
                .findByIdAndUserId(addressId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Adres bulunamadı"));

        addressRepository.delete(address);
    }
    public AddressResponse updateAddress(
            Long addressId,
            AddressCreateRequest request,
            Long userId
    ) {
        Address address = addressRepository
                .findByIdAndUserId(addressId, userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Address not found"));

        address.setTitle(request.title());
        address.setFullName(request.fullName());
        address.setPhone(request.phone());
        address.setCity(request.city());
        address.setDistrict(request.district());
        address.setNeighborhood(request.neighborhood());
        address.setAddressLine(request.addressLine());
        address.setPostalCode(request.postalCode());

        addressRepository.save(address);

        return mapToResponse(address);
    }
}
