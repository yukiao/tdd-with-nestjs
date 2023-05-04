import { Injectable } from '@nestjs/common';
import { Patient } from 'src/patient/patient.model';

export interface PatientInput {
    name: string;
}
@Injectable()
export class PatientService {
    async register(patientInput: PatientInput): Promise<Patient> {
        return {
            id: 1,
            name: patientInput.name
        }
    }

    public async doesPatientExist(patientId: number): Promise<boolean>{
        return false
    }
}
