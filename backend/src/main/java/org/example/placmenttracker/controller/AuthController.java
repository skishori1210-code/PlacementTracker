package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Admin;
import org.example.placmenttracker.entity.Role;
import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.repository.AdminRepository;
import org.example.placmenttracker.repository.StudentRepository;
import org.example.placmenttracker.security.JwtService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    // =========================================================
    // STUDENT REGISTER
    // =========================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Student student) {

        try {

            if (student.getName() == null ||
                    student.getName().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Name is required");
            }


            if (student.getEmail() == null ||
                    student.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }


            if (student.getPassword() == null ||
                    student.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Password is required");
            }


            if (studentRepository
                    .findByEmail(student.getEmail())
                    .isPresent()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email already registered");
            }


            // Encrypt password
            String encodedPassword =
                    passwordEncoder.encode(
                            student.getPassword()
                    );

            student.setPassword(encodedPassword);


            // Student can login immediately
            student.setApproved(true);


            // Set student role
            student.setRole(Role.STUDENT);


            Student savedStudent =
                    studentRepository.save(student);


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Registration successful. You can login now."
            );

            response.put(
                    "studentId",
                    savedStudent.getId()
            );

            response.put(
                    "email",
                    savedStudent.getEmail()
            );

            response.put(
                    "role",
                    "STUDENT"
            );


            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Registration failed: "
                                    + e.getMessage()
                    );
        }
    }


    // =========================================================
    // STUDENT LOGIN
    // =========================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request) {

        try {

            if (request.getEmail() == null ||
                    request.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }


            if (request.getPassword() == null ||
                    request.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Password is required");
            }


            Student student =
                    studentRepository
                            .findByEmail(
                                    request.getEmail()
                            )
                            .orElse(null);


            if (student == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Student not found");
            }


            if (student.getPassword() == null ||
                    student.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .internalServerError()
                        .body(
                                "Student password is not stored correctly"
                        );
            }


            boolean validPassword =
                    passwordEncoder.matches(
                            request.getPassword(),
                            student.getPassword()
                    );


            if (!validPassword) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid password");
            }


            // =================================================
            // IMPORTANT
            // NO ADMIN APPROVAL CHECK
            // =================================================

            if (student.getRole() == null) {

                student.setRole(Role.STUDENT);

                studentRepository.save(student);
            }


            String role =
                    student.getRole().name();


            String token =
                    jwtService.generateToken(
                            student.getEmail(),
                            role
                    );


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Student login successful"
            );

            response.put(
                    "token",
                    token
            );

            response.put(
                    "email",
                    student.getEmail()
            );

            response.put(
                    "role",
                    role
            );


            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Login failed: "
                                    + e.getMessage()
                    );
        }
    }


    // =========================================================
    // ADMIN LOGIN
    // =========================================================

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(
            @RequestBody LoginRequest request) {

        try {

            if (request.getEmail() == null ||
                    request.getEmail().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Email is required");
            }


            if (request.getPassword() == null ||
                    request.getPassword().trim().isEmpty()) {

                return ResponseEntity
                        .badRequest()
                        .body("Password is required");
            }


            Admin admin =
                    adminRepository
                            .findByEmail(
                                    request.getEmail()
                            )
                            .orElse(null);


            if (admin == null) {

                return ResponseEntity
                        .badRequest()
                        .body("Admin not found");
            }


            boolean validPassword = false;


            // Temporary admin account
            if (admin.getEmail()
                    .equalsIgnoreCase("admin@gmail.com")
                    &&
                    request.getPassword()
                            .equals("Admin@123")) {

                validPassword = true;

            } else {

                if (admin.getPassword() != null) {

                    validPassword =
                            passwordEncoder.matches(
                                    request.getPassword(),
                                    admin.getPassword()
                            );
                }
            }


            if (!validPassword) {

                return ResponseEntity
                        .badRequest()
                        .body("Invalid password");
            }


            if (admin.getRole() == null) {

                return ResponseEntity
                        .internalServerError()
                        .body(
                                "Admin role is not configured"
                        );
            }


            String role =
                    admin.getRole().name();


            String token =
                    jwtService.generateToken(
                            admin.getEmail(),
                            role
                    );


            Map<String, Object> response =
                    new HashMap<>();

            response.put(
                    "message",
                    "Admin login successful"
            );

            response.put(
                    "token",
                    token
            );

            response.put(
                    "email",
                    admin.getEmail()
            );

            response.put(
                    "role",
                    role
            );


            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .internalServerError()
                    .body(
                            "Admin login failed: "
                                    + e.getMessage()
                    );
        }
    }


    // =========================================================
    // LOGIN REQUEST
    // =========================================================

    public static class LoginRequest {

        private String email;

        private String password;


        public LoginRequest() {
        }


        public String getEmail() {

            return email;
        }


        public void setEmail(String email) {

            this.email = email;
        }


        public String getPassword() {

            return password;
        }


        public void setPassword(String password) {

            this.password = password;
        }
    }
}