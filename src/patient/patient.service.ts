import { Injectable } from '@nestjs/common';
import { Patient } from 'src/patient/patient.model';

export interface PatientInput {
    name: string;
}
@Injectable()
export class PatientService {
    private readonly patients: Patient[] = [];

    private nextId = 1;

    async register(patientInput: PatientInput): Promise<Patient> {
        const newPatient = {
            id: this.nextId++,
            name: patientInput.name,
        }

        this.patients.push(newPatient)

        return newPatient;
    }

    public async doesPatientExist(patientId: number): Promise<boolean>{
        return this.patients.some((patient) => patient.id === patientId);
    }
}
