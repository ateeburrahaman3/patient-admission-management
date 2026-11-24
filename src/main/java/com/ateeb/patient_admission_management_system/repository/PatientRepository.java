package com.ateeb.patient_admission_management_system.repository;

import com.ateeb.patient_admission_management_system.entity.Patient;
import com.ateeb.patient_admission_management_system.enums.Department;
import com.ateeb.patient_admission_management_system.enums.Doctor;
import com.ateeb.patient_admission_management_system.enums.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    @Query("""
        SELECT p FROM Patient p
            WHERE (:name IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%',:name,'%')))
                AND (:ward IS NULL OR p.ward = :ward)
                AND (:department IS NULL OR p.department = :department)
                AND (:doctor IS NULL OR p.doctor = :doctor)
    """)
    List<Patient> findPatients(
            @Param("name") String name,
            @Param("ward") Ward ward,
            @Param("department") Department department,
            @Param("doctor") Doctor doctor);
}
