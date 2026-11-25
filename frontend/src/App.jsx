import DashBoardHeader from "./DashBoardHeader.jsx";
import PatientList from "./PatientList.jsx";
import {useState, useEffect} from "react";
import PatientForm from "./PatientForm.jsx";
import API_BASE_URL from "./api.js";

function App(){

    const [activePage, setActivePage] = useState('add');
    const [patients, setPatients] = useState([])

    const totalPatients = patients.length;

    const admittedPatients = patients.filter(
        (patient) => patient.patientStatus === 'ADMITTED'
    ).length;

    const dischargedPatients = patients.filter(
        (patient) => patient.patientStatus === 'DISCHARGED'
    ).length;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [editingPatient, setEditingPatient] = useState(null);

    useEffect(() => {

        async function fetchPatients() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/api/patients`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch patients');
                }

                const data = await response.json();

                setPatients(data);

            } catch (err) {
                setError(
                    'Unable to connect to the server. Please contact developers.'
                );
            } finally {
                setLoading(false);
            }
        }

        fetchPatients();

    }, []);



    function handlePatientAdded(newPatient){
        setPatients([...patients,newPatient])
    }

    function handlePatientUpdated(updatedPatient) {
        setPatients(
            patients.map((patient) =>
                patient.id === updatedPatient.id
                    ? updatedPatient
                    : patient
            )
        );

        setEditingPatient(null);
        setActivePage('records');
    }

    function handleEditPatient(patient) {
        setEditingPatient(patient);
        setActivePage('add');
    }

    async function handleDeletePatient(patientId) {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this patient?'
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/patients/${patientId}`,
                {
                    method: 'DELETE'
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                throw new Error(
                    errorData.message || 'The requested operation failed.'
                );
            }

            setPatients((previousPatients) =>
                previousPatients.filter(
                    (patient) => patient.id !== patientId
                )
            );

            alert('Patient deleted successfully!');

        } catch (error) {
            alert(
                error instanceof TypeError
                    ? 'Unable to connect to the server. Please try again.'
                    : error.message
            );
        }
    }

    async function handleDischargePatient(patientId) {
        const confirmDischarge = window.confirm(
            'Are you sure you want to discharge this patient?'
        );

        if (!confirmDischarge) {
            return;
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/api/patients/${patientId}/discharge`,
                {
                    method: 'PATCH'
                }
            );

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));

                throw new Error(
                    errorData.message || 'The requested operation failed.'
                );
            }

            const updatedPatient = await response.json();

            setPatients((previousPatients) =>
                previousPatients.map((patient) =>
                    patient.id === patientId
                        ? updatedPatient
                        : patient
                )
            );

            alert('Patient discharged successfully!');

        } catch (error) {
            alert(
                error instanceof TypeError
                    ? 'Unable to connect to the server. Please try again.'
                    : error.message
            );
        }
    }

  return(
      <div>
          <DashBoardHeader
              title="Patient Admission Management"
              subtitle="Manage hospital admissions"
          />

          <nav>
              <button
                  className={activePage === 'add' ? 'active-nav' : ''}
                  onClick={() => setActivePage('add')}
              >
                  Add Patient
              </button>

              <button
                  className={activePage === 'records' ? 'active-nav' : ''}
                  onClick={() => setActivePage('records')}
              >
                  Patient Records
              </button>
          </nav>

          <main>

              <div className="dashboard-stats">

                  <div className="stat-card total-card">
                      <h3>Total Patients</h3>
                      <p>{totalPatients}</p>
                  </div>

                  <div className="stat-card admitted-card">
                      <h3>Admitted Patients</h3>
                      <p>{admittedPatients}</p>
                  </div>

                  <div className="stat-card discharged-card">
                      <h3>Discharged Patients</h3>
                      <p>{dischargedPatients}</p>
                  </div>

              </div>

              {loading && <p>Loading patients...</p>}

              {error && <p>Error: {error}</p>}

              {!loading && !error && activePage === 'add' && (
                  <PatientForm
                      onPatientAdded={handlePatientAdded}
                      onPatientUpdated={handlePatientUpdated}
                      editingPatient={editingPatient}
                  />
              )}

              {!loading && !error && activePage === 'records' && (
                  <PatientList
                      patients={patients}
                      onEditPatient={handleEditPatient}
                      onDeletePatient={handleDeletePatient}
                      onDischargePatient={handleDischargePatient}
                  />
              )}

          </main>

      </div>
  );
}

export default App;