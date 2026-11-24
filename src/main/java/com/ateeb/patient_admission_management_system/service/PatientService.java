package com.ateeb.patient_admission_management_system.service;

import com.ateeb.patient_admission_management_system.dto.request.CreatePatientRequest;
import com.ateeb.patient_admission_management_system.dto.request.UpdatePatientRequest;
import com.ateeb.patient_admission_management_system.dto.response.PatientResponse;
import com.ateeb.patient_admission_management_system.entity.Patient;
import com.ateeb.patient_admission_management_system.enums.Department;
import com.ateeb.patient_admission_management_system.enums.Doctor;
import com.ateeb.patient_admission_management_system.enums.PatientStatus;
import com.ateeb.patient_admission_management_system.enums.Ward;
import com.ateeb.patient_admission_management_system.exception.PatientNotFoundException;
import com.ateeb.patient_admission_management_system.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;

    @Transactional
    public PatientResponse createPatient(CreatePatientRequest request) {

        Patient patient = toPatient(request);
        Patient savedPatient = patientRepository.save(patient);

        return toPatientResponse(savedPatient);
    }

    @Transactional(readOnly = true)
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

    @Transactional
    public PatientResponse updatePatient(Long id,UpdatePatientRequest request) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));

        patient.setName(request.name());
        patient.setAge(request.age());
        patient.setGender(request.gender());
        patient.setWard(request.ward());
        patient.setDepartment(request.department());
        patient.setDoctor(request.doctor());
        patient.setAdmissionDate(request.admissionDate());
        patient.setPatientStatus(request.patientStatus());

        return toPatientResponse(patient);
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));

        patientRepository.delete(patient);
    }

    @Transactional
    public PatientResponse dischargePatient(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new PatientNotFoundException(id));

        patient.setPatientStatus(PatientStatus.DISCHARGED);

        return toPatientResponse(patient);
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
