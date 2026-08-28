package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Application;
import org.example.placmenttracker.entity.ApplicationStatus;
import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.repository.ApplicationRepository;
import org.example.placmenttracker.repository.JobRepository;
import org.example.placmenttracker.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private StudentRepository studentRepository;


    // =====================================
    // GET LOGGED-IN STUDENT
    // =====================================

    private Student getLoggedInStudent() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new RuntimeException(
                    "User is not authenticated"
            );
        }


        String email =
                authentication.getName();


        return studentRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Student not found"
                        )
                );
    }


    // =====================================
    // APPLY FOR JOB
    // =====================================

    public Application applyForJob(
            Long jobId) {


        Student student =
                getLoggedInStudent();


        Job job =
                jobRepository
                        .findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found"
                                )
                        );


        boolean alreadyApplied =
                applicationRepository
                        .existsByStudentIdAndJobId(
                                student.getId(),
                                jobId
                        );


        if (alreadyApplied) {

            throw new RuntimeException(
                    "You have already applied for this job."
            );
        }


        Application application =
                new Application();


        application.setStudent(
                student
        );


        application.setJob(
                job
        );


        application.setApplicationDate(
                LocalDate.now()
        );


        application.setStatus(
                ApplicationStatus.APPLIED
        );


        return applicationRepository.save(
                application
        );
    }


    // =====================================
    // ADMIN - ALL APPLICATIONS
    // =====================================

    public List<Application>
    getAllApplications() {

        return applicationRepository.findAll();

    }


    // =====================================
    // STUDENT - MY APPLICATIONS
    // =====================================

    public List<Application>
    getMyApplications() {


        Student student =
                getLoggedInStudent();


        return applicationRepository
                .findByStudentId(
                        student.getId()
                );
    }


    // =====================================
    // GET APPLICATION BY ID
    // =====================================

    public Application
    getApplicationById(Long id) {

        return applicationRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"
                        )
                );
    }


    // =====================================
    // ADMIN - UPDATE STATUS
    // =====================================

    public Application
    updateApplicationStatus(
            Long id,
            ApplicationStatus status) {


        Application application =
                applicationRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"
                                )
                        );


        application.setStatus(
                status
        );


        return applicationRepository.save(
                application
        );
    }
}