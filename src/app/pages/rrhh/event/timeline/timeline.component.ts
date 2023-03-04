import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReadCatalogueDto, ReadEventDto, ReadPlanningDto } from '@models/uic';
import { BreadcrumbService, CoreService } from '@services/core';
import { CataloguesHttpService, EventsHttpService, PlanningsHttpService } from '@services/uic';
import { PrimeIcons } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { CatalogueModel } from '@models/uic';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
})

export class TimelineComponent implements OnInit {
  planning:ReadPlanningDto = {}
  event:ReadEventDto = {}
  catalogues:ReadCatalogueDto={}
  id: string = '';
  search: UntypedFormControl = new UntypedFormControl('')
  events: any[];
  // catalogue : CatalogueModel[]=[];

  checked: boolean = true;
  panelHeader: string = 'LINEA DE TIEMPO DEL ESTUDIANTE';
  loaded$ = this.coreService.loaded$;


  constructor(
    private eventsHttpService: EventsHttpService,
    private cataloguesHttpService: CataloguesHttpService,
    // private planningsHttpService: PlanningsHttpService,
    private route: ActivatedRoute,
    private router: Router,
    private coreService: CoreService,
    private breadcrumbService: BreadcrumbService,
    private activatedRoute: ActivatedRoute,


  ){
    this.breadcrumbService.setItems([
      {label: 'Convocatorias', routerLink: ['/uic/plannings']},
      { label: 'TimeLine', routerLink: ['/uic/events/timeline'] }
    ]);
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'TIME LINE';
    }
    this.event = eventsHttpService.events
    this.catalogues = cataloguesHttpService.catalogues
  }

  ngOnInit() {
      this.events = [
      ];

      const planningId = this.route.snapshot.paramMap.get('planningId');
      this.findByPlanningTimeline(0, planningId);
  }

//Find

findByPlanningTimeline(page: number = 0, planningId: string = '', ) {
  const datePipe = new DatePipe('en-US');
  this.eventsHttpService.findByPlanningTimeline(page, this.search.value, planningId).subscribe((events) => {
    this.events = events.map(event => {
      const fechaInicio = datePipe.transform(event.startDate, 'dd/MM/yyyy');
      const fechaFin = datePipe.transform(event.endDate, 'dd/MM/yyyy');
      return {
        status: 
        `${event.sort}
         Nombre=${event.catalogue.name} 
         Fecha Inicio=${fechaInicio}  
         Fecha Fin=${fechaFin}`,
      };
    });  
  });
}

back(): void {
  this.router.navigate(['/uic/plannings']);
}
}
