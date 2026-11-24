package com.ateeb.patient_admission_management_system.controller;

import com.ateeb.patient_admission_management_system.dto.request.CreatePatientRequest;
import com.ateeb.patient_admission_management_system.dto.response.PatientResponse;
import com.ateeb.patient_admission_management_system.enums.Department;
import com.ateeb.patient_admission_management_system.enums.Doctor;
import com.ateeb.patient_admission_management_system.enums.Ward;
import com.ateeb.patient_admission_management_system.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(
            @Valid @RequestBody CreatePatientRequest request
    ){
        PatientResponse response = patientService.createPatient(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getPatients(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Ward ward,
            @RequestParam(required = false) Department department,
            @RequestParam(required = false) Doctor doctor
            ){
        return ResponseEntity.ok(patientService.getPatients(
                name,
                ward,
                department,
                doctor
        ));
    }
}
