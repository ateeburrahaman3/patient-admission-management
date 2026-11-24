package com.ateeb.patient_admission_management_system.dto.response;

import java.util.Map;

public record ApiErrorResponse(
        int status,
        String message,
        Map<String, String> errors
) {
}