package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Company;
import org.example.placmenttracker.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/companies")
@CrossOrigin(origins = "*")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // =========================
    // GET ALL COMPANIES
    // STUDENT + ADMIN
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<Company>> getAllCompanies() {

        return ResponseEntity.ok(
                companyService.getAllCompanies()
        );
    }

    // =========================
    // GET COMPANY BY ID
    // STUDENT + ADMIN
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<?> getCompanyById(
            @PathVariable Long id) {

        Company company =
                companyService.getCompanyById(id);

        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(company);
    }

    // =========================
    // CREATE COMPANY
    // ADMIN ONLY
    // =========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Company> createCompany(
            @RequestBody Company company) {

        return ResponseEntity.ok(
                companyService.saveCompany(company)
        );
    }

    // =========================
    // UPDATE COMPANY
    // ADMIN ONLY
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateCompany(
            @PathVariable Long id,
            @RequestBody Company company) {

        Company updated =
                companyService.updateCompany(id, company);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    // =========================
    // DELETE COMPANY
    // ADMIN ONLY
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteCompany(
            @PathVariable Long id) {

        companyService.deleteCompany(id);

        return ResponseEntity.ok(
                "Company deleted successfully"
        );
    }
}