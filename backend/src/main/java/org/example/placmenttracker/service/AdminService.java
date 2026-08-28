package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Company;
import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.entity.Student;

import java.util.List;

public interface AdminService {

    // Student management
    List<Student> getAllStudents();

    Student approveStudent(Long id);

    void deleteStudent(Long id);

    // Company management
    List<Company> getAllCompanies();

    // Job management
    List<Job> getAllJobs();
}