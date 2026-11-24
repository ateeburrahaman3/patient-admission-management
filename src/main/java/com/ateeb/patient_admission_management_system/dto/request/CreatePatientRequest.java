package com.ateeb.patient_admission_management_system.dto.request;

import com.ateeb.patient_admission_management_system.enums.*;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record CreatePatientRequest(
        @NotBlank(message = "Name is required")
        @Pattern(regexp = "^[A-Za-z ]+$",message = "Name must contain letters only")
        String name,

        @NotNull(message = "Age is required")
        @Min(value = 0,message = "Age must be at least 0")
        @Max(value = 120,message = "Age must not exceed 120")
        Integer age,

        @NotNull(message = "Gender is required")
        Gender gender,

        @NotNull(message = "Ward is required")
        Ward ward,

        @NotNull(message = "Department is required")
        Department department,

        @NotNull(message = "Doctor is required")
        Doctor doctor,

        @NotNull(message = "Admission date is required")
        @PastOrPresent(message = "Admission date cannot be in the future")
        LocalDate admissionDate,

        @NotNull(message = "Patient status is required")
        PatientStatus patientStatus
) {
}
