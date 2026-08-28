package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Student;

import java.util.List;

public interface StudentService {

    Student registerStudent(Student student);

    List<Student> getAllStudents();

    Student getStudentById(Long id);

    Student getStudentByEmail(String email);

    Student updateStudent(Long id, Student student);

    Student approveStudent(Long id);

    void deleteStudent(Long id);
}