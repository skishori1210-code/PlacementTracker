package org.example.placmenttracker.service;

import org.example.placmenttracker.entity.Job;
import org.example.placmenttracker.repository.ApplicationRepository;
import org.example.placmenttracker.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public Job getJobById(Long id) {
        return jobRepository.findById(id).orElse(null);
    }

    @Override
    public Job updateJob(Long id, Job job) {

        Job existingJob = jobRepository.findById(id).orElse(null);

        if (existingJob != null) {

            existingJob.setJobTitle(job.getJobTitle());
            existingJob.setJobType(job.getJobType());
            existingJob.setSalary(job.getSalary());
            existingJob.setVacancies(job.getVacancies());
            existingJob.setLastDate(job.getLastDate());
            existingJob.setCompany(job.getCompany());

            return jobRepository.save(existingJob);
        }

        return null;
    }

    @Override
    public void deleteJob(Long id) {

        applicationRepository.deleteByJobId(id);

        jobRepository.deleteById(id);
    }
}