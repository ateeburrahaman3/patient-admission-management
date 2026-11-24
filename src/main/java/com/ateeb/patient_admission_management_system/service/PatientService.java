package com.ateeb.patient_admission_management_system.service;

import com.ateeb.patient_admission_management_system.dto.request.CreatePatientRequest;
import com.ateeb.patient_admission_management_system.dto.response.PatientResponse;
import com.ateeb.patient_admission_management_system.entity.Patient;
import com.ateeb.patient_admission_management_system.enums.Department;
import com.ateeb.patient_admission_management_system.enums.Doctor;
import com.ateeb.patient_admission_management_system.enums.Ward;
import com.ateeb.patient_admission_management_system.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    public PatientResponse createPatient(CreatePatientRequest request) {

        Patient patient = toPatient(request);
        Patient savedPatient = patientRepository.save(patient);

        return toPatientResponse(savedPatient);
    }

    public List<PatientResponse> getPatients(
            String name,
            Ward ward,
            Department department,
            Doctor doctor
    ) {
        return patientRepository.findPatients(
                name,
                ward,
                department,
                doctor).stream()
                .map(this::toPatientResponse)
                .toList();
    }

    //Mappers

    private Patient toPatient(CreatePatientRequest request) {
        return new Patient(
                request.name(),
                request.age(),
                request.gender(),
                request.ward(),
                request.department(),
                request.doctor(),
                request.admissionDate(),
                request.patientStatus()
        );
    }

    private PatientResponse toPatientResponse(Patient patient) {
        return new PatientResponse(
                patient.getId(),
                patient.getName(),
                patient.getAge(),
                patient.getGender(),
                patient.getWard(),
                patient.getDepartment(),
                patient.getDoctor(),
                patient.getAdmissionDate(),
                patient.getPatientStatus()
        );
    }
}
