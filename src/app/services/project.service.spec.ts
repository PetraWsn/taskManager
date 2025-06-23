import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  const mockProjects: Project[] = [
    {
      id: 1,
      name: 'Testprojekt',
      description: 'Testdesc',
      deadline: '2025-07-31',
      tasks: [],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectService,
        provideHttpClientTesting(), // <-- Ny setup för HTTP mocking
      ],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Kontrollera att inga otestade requests finns kvar
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load projects on init and getAllProjects should return projects', () => {
    // Kontrollera att ett GET-anrop mot apiUrl görs
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);

    // Läs av signalens aktuella värde
    const projects = service.getAllProjects()();
    expect(projects).toEqual(mockProjects);
  });
});
