package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Company;

import java.util.List;

public interface CompanyService {

    Company saveCompany(Company company);

    List<Company> getAllCompanies();

    Company getCompanyById(Long id);

    Company updateCompany(Long id, Company company);

    void deleteCompany(Long id);
}