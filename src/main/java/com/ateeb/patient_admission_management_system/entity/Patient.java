package com.ateeb.patient_admission_management_system.entity;

import com.ateeb.patient_admission_management_system.enums.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(
        name = "patients"
)
@Getter @Setter @NoArgsConstructor
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Ward ward;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Doctor doctor;

    @Column(nullable = false)
    private LocalDate admissionDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PatientStatus patientStatus;


    //Constructor

    public Patient(String name, Integer age, Gender gender, Ward ward, Department department, Doctor doctor, LocalDate admissionDate, PatientStatus patientStatus) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.ward = ward;
        this.department = department;
        this.doctor = doctor;
        this.admissionDate = admissionDate;
        this.patientStatus = patientStatus;
    }
}
