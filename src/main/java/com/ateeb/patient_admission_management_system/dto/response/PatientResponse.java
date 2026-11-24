package com.ateeb.patient_admission_management_system.dto.response;

import com.ateeb.patient_admission_management_system.enums.*;
import java.time.LocalDate;

public record PatientResponse(
        Long id,
        String name,
        Integer age,
        Gender gender,
        Ward ward,
        Department department,
        Doctor doctor,
        LocalDate admissionDate,
        PatientStatus patientStatus
) {
}