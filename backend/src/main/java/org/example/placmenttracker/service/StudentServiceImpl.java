package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Role;
import org.example.placmenttracker.entity.Student;
import org.example.placmenttracker.repository.ApplicationRepository;
import org.example.placmenttracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Student registerStudent(Student student) {

        student.setPassword(passwordEncoder.encode(student.getPassword()));
        student.setApproved(false);
        student.setRole(Role.STUDENT);

        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    @Override
    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email).orElse(null);
    }

    @Override
    public Student updateStudent(Long id, Student student) {

        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(student.getName());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setBranch(student.getBranch());
        existingStudent.setYear(student.getYear());
        existingStudent.setCgpa(student.getCgpa());
        existingStudent.setSkills(student.getSkills());
        existingStudent.setResumeUrl(student.getResumeUrl());

        return studentRepository.save(existingStudent);
    }

    @Override
    public Student approveStudent(Long id) {

        Student student = studentRepository.findById(id).orElse(null);

        if (student == null) {
            return null;
        }

        student.setApproved(true);

        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(Long id) {

        applicationRepository.deleteByStudentId(id);

        studentRepository.deleteById(id);
    }
}