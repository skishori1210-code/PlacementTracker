package org.example.placmenttracker.config;

import org.example.placmenttracker.entity.Admin;
import org.example.placmenttracker.entity.Role;
import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.repository.AdminRepository;
import org.example.placmenttracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        // =========================
        // ADMIN
        // =========================

        Admin admin = adminRepository
                .findByEmail("admin@gmail.com")
                .orElse(null);

        if (admin != null) {

            admin.setPassword(
                    passwordEncoder.encode("Admin@123")
            );

            admin.setRole(Role.ADMIN);

            adminRepository.save(admin);

            System.out.println("--------------------------------");
            System.out.println("ADMIN LOGIN");
            System.out.println("Email: admin@gmail.com");
            System.out.println("Password: Admin@123");
            System.out.println("--------------------------------");
        }


        // =========================
        // STUDENT
        // =========================

        Student student = studentRepository
                .findByEmail("student@gmail.com")
                .orElse(null);

        if (student != null) {

            student.setPassword(
                    passwordEncoder.encode("Student@123")
            );

            student.setRole(Role.STUDENT);

            student.setApproved(true);

            studentRepository.save(student);

            System.out.println("--------------------------------");
            System.out.println("STUDENT LOGIN");
            System.out.println("Email: student@gmail.com");
            System.out.println("Password: Student@123");
            System.out.println("--------------------------------");
        }
    }
}