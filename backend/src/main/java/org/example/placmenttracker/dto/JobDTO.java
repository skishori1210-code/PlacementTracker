package org.example.placmenttracker.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobDTO {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Job type is required")
    private String jobType;

    @NotNull(message = "Salary is required")
    @Positive(message = "Salary must be greater than 0")
    private Double salary;

    @NotNull(message = "Vacancies are required")
    @Positive(message = "Vacancies must be greater than 0")
    private Integer vacancies;

    @NotBlank(message = "Last date is required")
    private String lastDate;

    @NotNull(message = "Company ID is required")
    private Long companyId;
}