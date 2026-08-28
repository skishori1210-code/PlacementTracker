package org.example.placmenttracker.dto;

public class DashboardResponse {

    private long students;
    private long companies;
    private long jobs;
    private long applications;

    public DashboardResponse() {
    }

    public DashboardResponse(long students, long companies, long jobs, long applications) {
        this.students = students;
        this.companies = companies;
        this.jobs = jobs;
        this.applications = applications;
    }

    public long getStudents() {
        return students;
    }

    public void setStudents(long students) {
        this.students = students;
    }

    public long getCompanies() {
        return companies;
    }

    public void setCompanies(long companies) {
        this.companies = companies;
    }

    public long getJobs() {
        return jobs;
    }

    public void setJobs(long jobs) {
        this.jobs = jobs;
    }

    public long getApplications() {
        return applications;
    }

    public void setApplications(long applications) {
        this.applications = applications;
    }
}