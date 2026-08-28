package org.example.placmenttracker.service;

import org.example.placmenttracker.dto.DashboardResponse;
import org.example.placmenttracker.repository.ApplicationRepository;
import org.example.placmenttracker.repository.CompanyRepository;
import org.example.placmenttracker.repository.JobRepository;
import org.example.placmenttracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public DashboardResponse getDashboardData() {

        return new DashboardResponse(
                studentRepository.count(),
                companyRepository.count(),
                jobRepository.count(),
                applicationRepository.count()
        );
    }
}