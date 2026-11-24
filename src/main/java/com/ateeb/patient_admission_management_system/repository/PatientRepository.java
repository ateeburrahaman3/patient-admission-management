package com.ateeb.patient_admission_management_system.repository;

import com.ateeb.patient_admission_management_system.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientRepository extends JpaRepository<Patient, Long> {
}
