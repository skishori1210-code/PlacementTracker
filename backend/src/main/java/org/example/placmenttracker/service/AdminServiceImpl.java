package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Company;
import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.repository.CompanyRepository;
import org.example.placmenttracker.repository.JobRepository;
import org.example.placmenttracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private JobRepository jobRepository;

    // =========================
    // STUDENT MANAGEMENT
    // =========================

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student approveStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElse(null);

        if (student != null) {
            student.setApproved(true);
            return studentRepository.save(student);
        }

        return null;
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // =========================
    // COMPANY MANAGEMENT
    // =========================

    @Override
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // =========================
    // JOB MANAGEMENT
    // =========================

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }
}