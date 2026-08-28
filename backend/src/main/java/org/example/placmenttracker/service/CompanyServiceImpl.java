package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Company;
import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.repository.ApplicationRepository;
import org.example.placmenttracker.repository.CompanyRepository;
import org.example.placmenttracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyServiceImpl implements CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    @Override
    public Company getCompanyById(Long id) {
        return companyRepository.findById(id).orElse(null);
    }

    @Override
    public Company updateCompany(Long id, Company company) {

        Company existingCompany = companyRepository.findById(id).orElse(null);

        if (existingCompany != null) {

            existingCompany.setCompanyName(company.getCompanyName());
            existingCompany.setLocation(company.getLocation());
            existingCompany.setPackageOffered(company.getPackageOffered());
            existingCompany.setMinimumCGPA(company.getMinimumCGPA());
            existingCompany.setEligibleBranch(company.getEligibleBranch());
            existingCompany.setJobRole(company.getJobRole());
            existingCompany.setDeadline(company.getDeadline());
            existingCompany.setDescription(company.getDescription());

            return companyRepository.save(existingCompany);
        }

        return null;
    }

    @Override
    public void deleteCompany(Long id) {

        List<Job> jobs = jobRepository.findByCompanyId(id);

        for (Job job : jobs) {
            applicationRepository.deleteByJobId(job.getId());
        }

        jobRepository.deleteAll(jobs);

        companyRepository.deleteById(id);
    }
}