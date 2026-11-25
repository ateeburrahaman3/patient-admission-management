import {useState} from "react";

function PatientList({
                         patients,
                         onEditPatient,
                         onDeletePatient,
                         onDischargePatient
                     }) {

    const [searchName, setSearchName] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');

    const filteredPatients = patients.filter((patient) => {

        const matchesName = patient.name
            .toLowerCase()
            .includes(searchName.toLowerCase());

        const matchesWard = selectedWard === ''
            || patient.ward === selectedWard;

        const matchesDepartment = selectedDepartment === ''
            || patient.department === selectedDepartment;

        const matchesDoctor = selectedDoctor === ''
            || patient.doctor === selectedDoctor;

        return matchesName && matchesWard && matchesDepartment && matchesDoctor;
    });

    return(
        <div>
            <h2>Patient Records</h2>

            <input
                type="text"
                placeholder="Search patient by name..."
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
            />

            <select
                value={selectedWard}
                onChange={(event) => setSelectedWard(event.target.value)}
            >
                <option value="">All Wards</option>
                <option value="GENERAL">General</option>
                <option value="ICU">ICU</option>
                <option value="EMERGENCY">Emergency</option>
            </select>

            <select
                value={selectedDepartment}
                onChange={(event) => setSelectedDepartment(event.target.value)}
            >
                <option value="">All Departments</option>
                <option value="CARDIOLOGY">Cardiology</option>
                <option value="NEUROLOGY">Neurology</option>
                <option value="SURGERY">Surgery</option>
            </select>


            <select
                value={selectedDoctor}
                onChange={(event) => setSelectedDoctor(event.target.value)}
            >
                <option value="">All Doctors</option>
                <option value="DR_A">Dr A</option>
                <option value="DR_B">Dr B</option>
                <option value="DR_C">Dr C</option>
            </select>

            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Ward</th>
                        <th>Department</th>
                        <th>Doctor</th>
                        <th>Admission Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredPatients.map((patient) => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.ward}</td>
                            <td>{patient.department}</td>
                            <td>{patient.doctor}</td>
                            <td>{patient.admissionDate}</td>
                            <td>
                                <span
                                    className={
                                        patient.patientStatus === 'ADMITTED'
                                            ? 'status-admitted'
                                            : 'status-discharged'
                                    }
                                >
                                    {patient.patientStatus}
                                </span>
                            </td>

                            <td>
                                <button onClick={() => onEditPatient(patient)}>
                                    Edit
                                </button>

                                <button onClick={() => onDeletePatient(patient.id)}>
                                    Delete
                                </button>

                                {patient.patientStatus === 'ADMITTED' && (
                                    <button onClick={() => onDischargePatient(patient.id)}>
                                        Discharge
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {filteredPatients.length === 0 && (
                <p>No matching patients found.</p>
            )}

        </div>
    );
}

export default PatientList;










