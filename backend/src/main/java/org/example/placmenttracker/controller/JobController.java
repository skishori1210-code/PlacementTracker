package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobs")
@CrossOrigin(origins = "*")
public class JobController {

    @Autowired
    private JobService jobService;

    // =========================
    // GET ALL JOBS
    // STUDENT + ADMIN
    // =========================
    @GetMapping
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(
                jobService.getAllJobs()
        );
    }

    // =========================
    // GET JOB BY ID
    // STUDENT + ADMIN
    // =========================
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'ADMIN')")
    public ResponseEntity<?> getJobById(
            @PathVariable Long id) {

        Job job =
                jobService.getJobById(id);

        if (job == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(job);
    }

    // =========================
    // CREATE JOB
    // ADMIN ONLY
    // =========================
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Job> createJob(
            @RequestBody Job job) {

        return ResponseEntity.ok(
                jobService.saveJob(job)
        );
    }

    // =========================
    // UPDATE JOB
    // ADMIN ONLY
    // =========================
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @RequestBody Job job) {

        Job updated =
                jobService.updateJob(id, job);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    // =========================
    // DELETE JOB
    // ADMIN ONLY
    // =========================
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteJob(
            @PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok(
                "Job deleted successfully"
        );
    }
}