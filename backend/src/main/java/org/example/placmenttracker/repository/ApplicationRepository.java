package org.example.placmenttracker.repository;

import jakarta.transaction.Transactional;
import org.example.placmenttracker.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // ============================
    // Existing methods
    // ============================

    boolean existsByStudentIdAndJobId(Long studentId, Long jobId);

    List<Application> findByStudentId(Long studentId);

    // ============================
    // Delete Applications
    // ============================

    @Transactional
    @Modifying
    @Query("DELETE FROM Application a WHERE a.student.id = :studentId")
    void deleteByStudentId(Long studentId);

    @Transactional
    @Modifying
    @Query("DELETE FROM Application a WHERE a.job.id = :jobId")
    void deleteByJobId(Long jobId);
}