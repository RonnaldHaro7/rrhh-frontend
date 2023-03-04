import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () =>
      import('./event/event.module').then((m) => m.EventModule),
  },
  {
    path: 'assignaments',
    loadChildren: () =>
      import('./assignament/assignament.module').then(
        (m) => m.AssignamentModule
      ),
  },
  {
    path: 'catalogues',
    loadChildren: () =>
      import('./catalogue/catalogue.module').then((m) => m.CatalogueModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
  },
  {
    path: 'plannings',
    loadChildren: () =>
      import('./planning/planning.module').then((m) => m.PlanningModule),
  },
  {
    path: 'modalities',
    loadChildren: () =>
      import('./modality/modality.module').then((m) => m.ModalityModule),
  },
  {
    path: 'requirements',
    loadChildren: () =>
      import('./requirement/requirement.module').then(
        (m) => m.RequirementModule
      ),
  },
  {
    path: 'tutor-assignments',
    loadChildren: () =>
      import('./tutor-assignment/tutor-assignment.module').then(
        (m) => m.TutorAssignmentModule
      ),
  },
  {
    path: 'project-plans',
    loadChildren: () =>
      import('./project-plan/project-plan.module').then(
        (m) => m.ProjectPlanModule
      ),
  },
  {
    path: 'project-plans/:id',
     loadChildren: () => import('./project-plan/project-plan.module').then(m => m.ProjectPlanModule)
  },
  {
    path: 'project-plans/ver/:id',
     loadChildren: () => import('./project-plan/project-plan.module').then(m => m.ProjectPlanModule)
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
  {
    path: 'enrollments',
    loadChildren: () =>
      import('./enrollment/enrollment.module').then((m) => m.EnrollmentModule),
  },
  {
    path: 'student-informations',
    loadChildren: () =>
      import('./student-information/student-information.module').then(
        (m) => m.StudentInformationModule
      ),
  },
  {
    path: 'requirement-requests',
    loadChildren: () =>
      import('./requirement-request/requirement-request.module').then(
        (m) => m.RequirementRequestModule
      ),
  },
  {
    path: 'requirement-formats',
    loadChildren: () =>
      import('./requirement-format/requirement-format.module').then(
        (m) => m.RequirementFormatModule
      ),
  },
  {
    path: 'mesh-student-requirements',
    loadChildren: () =>
      import('./mesh-student-requirement/mesh-student-requirement.module').then(
        (m) => m.MeshStudentRequirementModule
      ),
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./document/document.module').then((m) => m.DocumentModule),
  },
  {
    path: 'professions',
    loadChildren: () =>
      import('./profession/profession.module').then((m) => m.ProfessionModule),
  },
  {
    path: 'inscriptions',
    loadChildren: () =>
      import('./inscription/inscription.module').then(
        (m) => m.InscriptionModule
      ),
  },
  {
    path: 'years',
    loadChildren: () => import('./year/year.module').then((m) => m.YearModule),
  },
  {
    path: 'estudiantes',
    loadChildren: () => import('./estudiante/estudiante.module').then(m => m.EstudianteModule)
  },
  {
    path: 'responsible-tutors',
    loadChildren: () => import('./responsible-tutor/responsible-tutor.module').then(m => m.ResponsibleTutorModule)
  },

  {
    path: 'tribunals',
    loadChildren: () => import('./tribunal/tribunal.module').then(m => m.TribunalModule)
  },

  {
    path: 'teachers',
    loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
  },

  {
    path: 'students-degree',
    loadChildren: () => import('./student-degree/student-degree.module').then(m => m.StudentDegreeModule)
  },
  {
    path: 'format-proyect-plan',
    loadChildren: () => import('./format-proyect-plan/format-proyect-plan.module').then(m => m.FormatProyectPlanModule)
  },
  {
    path: 'approval-request',
    loadChildren: () => import('./approval-request/approval-request.module').then(m => m.ApprovalRequestModule)
  },
  {
    path: 'response-project-plans',
    loadChildren: () => import('./response-project-plan/response-project-plan.module').then(m => m.ResponseProjectPlanModule)
  },
  {
    path: 'coordinators',
    loadChildren: () => import('./coordinator/coordinator.module').then(m => m.CoordinatorModule)
  },

  {
    path: 'menu-students',
    loadChildren: () => import('./menu-student/menu-student.module').then(m => m.MenuStudentModule)
  },
  {
    path: 'upload-requirement-requests',
    loadChildren: () => import('./upload-requirement-request/upload-requirement-request.module').then(m => m.UploadRequirementRequestModule)
  },
  {
    path: 'formats',
    loadChildren: () => import('./format/format.module').then(m => m.FormatModule)
  },

  {
    path: 'download-formats',
    loadChildren: () => import('./download-format/download-format.module').then(m => m.DownloadFormatModule)
  },

  {
    path: 'upload-requirement-requests',
    loadChildren: () => import('./upload-requirement-request/upload-requirement-request.module').then(m => m.UploadRequirementRequestModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UicRoutingModule {
}
