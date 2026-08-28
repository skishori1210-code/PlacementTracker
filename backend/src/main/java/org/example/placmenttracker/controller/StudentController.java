package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.service.StudentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(
        origins = {
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175"
        }
)
public class StudentController {

    @Autowired
    private StudentService studentService;


    // =====================================================
    // LOGGED-IN STUDENT PROFILE
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(
            Authentication authentication) {

        if (authentication == null) {
            return ResponseEntity
                    .status(401)
                    .body("Not authenticated");
        }

        String email = authentication.getName();

        Student student =
                studentService.getStudentByEmail(email);

        if (student == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Student not found");
        }

        return ResponseEntity.ok(student);
    }


    // =====================================================
    // UPDATE LOGGED-IN STUDENT PROFILE
    // =====================================================

    @PutMapping("/me")
    public ResponseEntity<?> updateMyProfile(
            Authentication authentication,
            @RequestBody Student updatedStudent) {

        if (authentication == null) {
            return ResponseEntity
                    .status(401)
                    .body("Not authenticated");
        }

        String email = authentication.getName();

        Student existingStudent =
                studentService.getStudentByEmail(email);

        if (existingStudent == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Student not found");
        }


        // -------------------------------------------------
        // Update profile fields
        // -------------------------------------------------

        existingStudent.setName(
                updatedStudent.getName()
        );

        existingStudent.setPhone(
                updatedStudent.getPhone()
        );

        existingStudent.setBranch(
                updatedStudent.getBranch()
        );

        existingStudent.setYear(
                updatedStudent.getYear()
        );

        existingStudent.setCgpa(
                updatedStudent.getCgpa()
        );

        existingStudent.setSkills(
                updatedStudent.getSkills()
        );

        existingStudent.setResumeUrl(
                updatedStudent.getResumeUrl()
        );


        // -------------------------------------------------
        // Save
        // -------------------------------------------------

        Student savedStudent =
                studentService.updateStudent(
                        existingStudent.getId(),
                        existingStudent
                );


        return ResponseEntity.ok(savedStudent);
    }


    // =====================================================
    // REGISTER STUDENT
    // =====================================================

    @PostMapping("/register")
    public Student registerStudent(
            @RequestBody Student student) {

        return studentService.registerStudent(student);
    }


    // =====================================================
    // GET ALL STUDENTS
    // ADMIN
    // =====================================================

    @GetMapping
    public List<Student> getAllStudents() {

        return studentService.getAllStudents();
    }


    // =====================================================
    // GET STUDENT BY ID
    // ADMIN
    // =====================================================

    @GetMapping("/{id}")
    public Student getStudentById(
            @PathVariable Long id) {

        return studentService.getStudentById(id);
    }


    // =====================================================
    // UPDATE STUDENT BY ID
    // ADMIN
    // =====================================================

    @PutMapping("/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        return studentService.updateStudent(
                id,
                student
        );
    }


    // =====================================================
    // APPROVE STUDENT
    // ADMIN
    // =====================================================

    @PutMapping("/{id}/approve")
    public Student approveStudent(
            @PathVariable Long id) {

        return studentService.approveStudent(id);
    }


    // =====================================================
    // DELETE STUDENT
    // ADMIN
    // =====================================================

    @DeleteMapping("/{id}")
    public String deleteStudent(
            @PathVariable Long id) {

        studentService.deleteStudent(id);

        return "Student deleted successfully!";
    }
}