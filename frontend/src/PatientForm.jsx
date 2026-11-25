import {useEffect, useState} from 'react';
import API_BASE_URL from "./api.js";

function PatientForm({ onPatientAdded ,onPatientUpdated, editingPatient}) {

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        ward: '',
        department: '',
        doctor: '',
        admissionDate: '',
        patientStatus: 'ADMITTED'
    });

    useEffect(() => {

        if (editingPatient) {
            setFormData({
                name: editingPatient.name,
                age: editingPatient.age,
                gender: editingPatient.gender,
                ward: editingPatient.ward,
                department: editingPatient.department,
                doctor: editingPatient.doctor,
                admissionDate: editingPatient.admissionDate,
                patientStatus: editingPatient.patientStatus
            });
        }

    }, [editingPatient]);

    function handleChange(event) {

        const {name,value}= event.target

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const isEditing = editingPatient !== null;

            const url = isEditing
                ? `${API_BASE_URL}/api/patients/${editingPatient.id}`
                : `${API_BASE_URL}/api/patients`;

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    ...formData,
                    age: Number(formData.age)
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                let errorMessage = errorData.message || 'Request failed';

                if (errorData.errors) {
                    const fieldErrors = Object.entries(errorData.errors)
                        .map(([field, message]) => `${field}: ${message}`)
                        .join('\n');

                    errorMessage += '\n' + fieldErrors;
                }

                throw new Error(errorMessage);
            }

            const savedPatient = await response.json();

            alert(
                isEditing
                    ? 'Patient updated successfully!'
                    : 'Patient added successfully!'
            );

            setFormData({
                name: '',
                age: '',
                gender: '',
                ward: '',
                department: '',
                doctor: '',
                admissionDate: '',
                patientStatus: 'ADMITTED'
            });

            if (isEditing) {
                onPatientUpdated(savedPatient);
            } else {
                onPatientAdded(savedPatient);
            }

        } catch (error) {
            alert(
                error instanceof TypeError
                    ? 'Unable to connect to the server. Please try again.'
                    : error.message
            );
        }
    }

    return (
        <div>

            <h2>
                {editingPatient ? 'Edit Patient' : 'Add New Patient'}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Patient Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    pattern="[A-Za-z ]+"
                    title="Name must contain letters and spaces only"
                />

                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={formData.age}
                    onChange={handleChange}
                    min="0"
                    max="120"
                    step="1"
                    required
                />

                <select name="gender" value={formData.gender}
                        onChange={handleChange} required>
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                </select>

                <select name="ward" value={formData.ward}
                        onChange={handleChange} required>
                    <option value="">Select Ward</option>
                    <option value="GENERAL">General</option>
                    <option value="ICU">ICU</option>
                    <option value="EMERGENCY">Emergency</option>
                </select>

                <select name="department" value={formData.department}
                        onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="CARDIOLOGY">Cardiology</option>
                    <option value="NEUROLOGY">Neurology</option>
                    <option value="SURGERY">Surgery</option>
                </select>

                <select name="doctor" value={formData.doctor}
                        onChange={handleChange} required>
                    <option value="">Select Doctor</option>
                    <option value="DR_A">Dr A</option>
                    <option value="DR_B">Dr B</option>
                    <option value="DR_C">Dr C</option>
                </select>

                <label htmlFor="admissionDate">Admission Date</label>

                <input
                    type="date"
                    id="admissionDate"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleChange}
                    max={new Date().toLocaleDateString('en-CA')}
                    required
                />

                <select name="patientStatus"
                        value={formData.patientStatus}
                        onChange={handleChange} required>
                    <option value="ADMITTED">Admitted</option>
                    <option value="DISCHARGED">Discharged</option>
                </select>

                <button type="submit">
                    {editingPatient ? 'Update Patient' : 'Add Patient'}
                </button>

            </form>

        </div>
    );
}

export default PatientForm;
