package org.example.placmenttracker.controller;

import org.example.placmenttracker.entity.Application;
import org.example.placmenttracker.entity.ApplicationStatus;
import org.example.placmenttracker.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = "*")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;


    // =====================================
    // STUDENT - APPLY
    // =====================================

    @PostMapping
    public ResponseEntity<?> applyForJob(
            @RequestBody Map<String, Long> request) {

        Long jobId = request.get("jobId");


        if (jobId == null) {

            return ResponseEntity
                    .badRequest()
                    .body("jobId is required");
        }


        Application application =
                applicationService.applyForJob(jobId);


        return ResponseEntity.ok(
                application
        );
    }


    // =====================================
    // ADMIN - ALL APPLICATIONS
    // =====================================

    @GetMapping
    public ResponseEntity<List<Application>>
    getAllApplications() {

        return ResponseEntity.ok(
                applicationService
                        .getAllApplications()
        );
    }


    // =====================================
    // STUDENT - MY APPLICATIONS
    // =====================================

    @GetMapping("/my")
    public ResponseEntity<List<Application>>
    getMyApplications() {

        return ResponseEntity.ok(
                applicationService
                        .getMyApplications()
        );
    }


    // =====================================
    // ADMIN - APPLICATION BY ID
    // =====================================

    @GetMapping("/{id}")
    public ResponseEntity<Application>
    getApplicationById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                applicationService
                        .getApplicationById(id)
        );
    }


    // =====================================
    // ADMIN - UPDATE STATUS
    // =====================================

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateApplicationStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {


        String statusValue =
                request.get("status");


        if (statusValue == null) {

            return ResponseEntity
                    .badRequest()
                    .body("status is required");
        }


        ApplicationStatus status;


        try {

            status =
                    ApplicationStatus.valueOf(
                            statusValue.toUpperCase()
                    );

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            "Invalid status. Use: APPLIED, SHORTLISTED, SELECTED, or REJECTED"
                    );
        }


        Application application =
                applicationService
                        .updateApplicationStatus(
                                id,
                                status
                        );


        return ResponseEntity.ok(
                application
        );
    }
}