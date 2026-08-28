package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Company;
import org.example.placmenttracker.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/companies")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private CompanyRepository companyRepository;

    // Create Company
    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {

        Company savedCompany = companyRepository.save(company);

        return ResponseEntity.ok(savedCompany);
    }

    // Get All Companies
    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(companyRepository.findAll());
    }

    // Get Company By ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getCompanyById(@PathVariable Long id) {

        return companyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Company
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCompany(
            @PathVariable Long id,
            @RequestBody Company company) {

        Company existingCompany = companyRepository.findById(id).orElse(null);

        if (existingCompany == null) {
            return ResponseEntity.notFound().build();
        }

        existingCompany.setCompanyName(company.getCompanyName());
        existingCompany.setLocation(company.getLocation());
        existingCompany.setPackageOffered(company.getPackageOffered());
        existingCompany.setMinimumCGPA(company.getMinimumCGPA());
        existingCompany.setEligibleBranch(company.getEligibleBranch());
        existingCompany.setJobRole(company.getJobRole());
        existingCompany.setDeadline(company.getDeadline());
        existingCompany.setDescription(company.getDescription());

        Company updatedCompany = companyRepository.save(existingCompany);

        return ResponseEntity.ok(updatedCompany);
    }

    // Delete Company
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable Long id) {

        if (!companyRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        companyRepository.deleteById(id);

        return ResponseEntity.ok("Company deleted successfully");
    }
}