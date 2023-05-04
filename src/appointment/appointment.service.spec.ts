import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentService } from './appointment.service';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentService],
    }).compile();

    service = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should schedule an unconfirmed appointment for a user on success', () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2022-01-01T15:00:00Z');
    
    const newAppointment = service.scheduleAppointment({
      patientId: 1,
      startTime,
      endTime
    })
    
    expect(newAppointment).toEqual({
      patientId: 1,
      startTime,
      endTime,
      confirmed: false
    })
  })
  
  it('should throw an error when end time is before start time', () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2022-01-01T13:00:00Z');
    
    expect(() => 
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime
      })    
    ).toThrowError("appointment's endTime should be after startTime");

  })

  it("should throw an error when end time is equal to start time", () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = startTime

    expect(() => {
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime,
      })
    }).toThrowError("appointment's endTime should be after startTime");
  })

  it('should throw an error when end time is in the next day', () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2022-02-01T00:00:00Z');

    expect(() => 
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime
      })
    ).toThrowError(
      "appointment's endTime should be in the same day as start time's"
    )
  })

  it('should throw an error when end time is in the same day, hour and month of the next year', () => {
    const startTime = new Date('2022-01-01T14:00:00Z');
    const endTime = new Date('2023-01-01T14:00:00Z');

    expect(() => 
      service.scheduleAppointment({
        patientId: 1,
        startTime,
        endTime
      })
    ).toThrowError(
      "appointment's endTime should be in the same day as start time's"
    )
  })

});