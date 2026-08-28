package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/jobs")
@CrossOrigin(origins = "*")
public class AdminJobController {

    @Autowired
    private JobRepository jobRepository;

    // CREATE JOB
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Job> createJob(@RequestBody Job job) {

        Job savedJob = jobRepository.save(job);

        return ResponseEntity.ok(savedJob);
    }

    // GET ALL JOBS
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Job>> getAllJobs() {

        return ResponseEntity.ok(jobRepository.findAll());
    }

    // GET JOB BY ID
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getJobById(@PathVariable Long id) {

        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE JOB
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateJob(
            @PathVariable Long id,
            @RequestBody Job job) {

        Job existingJob =
                jobRepository.findById(id).orElse(null);

        if (existingJob == null) {
            return ResponseEntity.notFound().build();
        }

        existingJob.setJobTitle(job.getJobTitle());
        existingJob.setJobType(job.getJobType());
        existingJob.setSalary(job.getSalary());
        existingJob.setVacancies(job.getVacancies());
        existingJob.setLastDate(job.getLastDate());
        existingJob.setCompany(job.getCompany());

        Job updatedJob =
                jobRepository.save(existingJob);

        return ResponseEntity.ok(updatedJob);
    }

    // DELETE JOB
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteJob(@PathVariable Long id) {

        if (!jobRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        jobRepository.deleteById(id);

        return ResponseEntity.ok("Job deleted successfully");
    }
}