package com.ateeb.patient_admission_management_system.controller;

import com.ateeb.patient_admission_management_system.dto.request.CreatePatientRequest;
import com.ateeb.patient_admission_management_system.dto.response.PatientResponse;
import com.ateeb.patient_admission_management_system.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
