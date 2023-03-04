import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueModel, PlanningModel, ReadPlanningDto} from '@models/uic';
import {CataloguesHttpService, PlanningsHttpService} from '@services/uic';
import {BreadcrumbService, CoreService, MessageService} from '@services/core';
import {OnExitInterface} from '@shared/interfaces';
import { EventsHttpService } from '@services/uic';
import { CreateEventDto, UpdateEventDto } from '@models/uic';
import { CatalogueTypeEnum } from '@shared/enums';
import { PlanningTypeEnum } from '@shared/enums/planning.enum';
import { format } from 'date-fns';
import { DateValidators } from '@shared/validators';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventFormComponent implements OnInit, OnExitInterface {
  planning:ReadPlanningDto = {}
  id: string = '';
  bloodTypes: CatalogueModel[] = [];
  catalogue: CatalogueModel[] = [];
  plannings: PlanningModel[] = [];
  form: UntypedFormGroup = this.newForm;
  panelHeader: string = 'Crear fase';
  isChangePassword: UntypedFormControl = new UntypedFormControl(false);
  isLoadingSkeleton: boolean = false;
  loaded$ = this.coreService.loaded$;
  checked: boolean = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private cataloguesHttpService: CataloguesHttpService,
    private planningsHttpService: PlanningsHttpService,
    private coreService: CoreService,
    private formBuilder: UntypedFormBuilder,
    public messageService: MessageService,
    private router: Router,
    private eventsHttpService: EventsHttpService,
  ) {
    this.breadcrumbService.setItems([
      {label: 'Convocatorias', routerLink: ['/uic/plannings']},
      {label: `${this.planningsHttpService.plannings.name}`, routerLink: ['/uic/events/plannings',this.planningsHttpService.plannings.id]},
      {label: 'Nueva fase'},
    ]);
      console.log(activatedRoute.snapshot.params['id'] )
    if (activatedRoute.snapshot.params['id'] !== 'new') {
      this.id = activatedRoute.snapshot.params['id'];
      this.panelHeader = 'Actualizar fase';
    }
    this.planning = planningsHttpService.plannings
    console.log(planningsHttpService.plannings)
    
  }

  async onExit(): Promise<boolean> {
    if (this.form.touched || this.form.dirty) {
      return await this.messageService.questionOnExit().then(result => result.isConfirmed);
    }
    return true;
  }

  ngOnInit(): void {
    this.getCatalogueName();
    this.getPlanningName();
    if(this.id){
    this.getEvent();
  }
  }


  get newForm(): UntypedFormGroup {
    return this.formBuilder.group({
      catalogue: [null, [Validators.required]],
      planning: [null, [Validators.required]],
      endDate: [null, [Validators.required,DateValidators.min(new Date())]],
      startDate: [null, [DateValidators.min(new Date())]],
      isEnable: [false, [Validators.required]],
      sort: [null, [Validators.required]],
    });
   
    
  }
  
  onSubmit(): void {
    if (this.form.valid) {
      if (this.id != '') {
        this.update(this.form.value);
      } else {
        this.create(this.form.value);
      }
    } else {
      this.form.markAllAsTouched();
      this.messageService.errorsFields.then();
    }
  }

  back(planningId: string): void {
    this.router.navigate(['/uic/events/plannings',planningId]);
  }
  
  create(event: CreateEventDto): void {
    this.eventsHttpService.create(event).subscribe(event => {
      this.form.reset(event);
      this.back(this.planning.id);
    });
  }


  getEvent(): void {
    this.isLoadingSkeleton = true;
    this.eventsHttpService.findOne(this.id).subscribe((event) => {
      this.isLoadingSkeleton = false;
      this.form.patchValue(event);
      let startedAt = format(new Date(event.startDate), 'dd/MM/yyyy');
      console.log (startedAt);
      this.startDateField.setValue(startedAt);
      let endedAt = format(new Date(event.endDate), 'dd/MM/yyyy');
      console.log (endedAt);
      this.endDateField.setValue(endedAt);
    });
  }

  getCatalogueName(): void {
    this.isLoadingSkeleton = true;
    this.cataloguesHttpService.catalogue(CatalogueTypeEnum.EVENT_NAMES).subscribe((catalogue) => {
      this.isLoadingSkeleton = false;
      this.catalogue = catalogue;
    });
  }

  getPlanningName(): void {
    this.isLoadingSkeleton = true;
    this.planningsHttpService.planning(PlanningTypeEnum.EVENT_NAMES).subscribe((plannings) => {
      this.isLoadingSkeleton = false;
      this.plannings = plannings;
    });
  }

  update(event:UpdateEventDto): void {
    this.eventsHttpService.update(this.id, event).subscribe((event) => {
      this.form.reset(event);
      this.back(this.planning.id)
    });
  }

  // Getters

  get catalogueField() {
    return this.form.controls['catalogue'];
  }

  get planningField() {
    return this.form.controls['planning'];
  }

  get startDateField() {
    return this.form.controls['startDate'];
  }

  get endDateField() {
    return this.form.controls['endDate'];
  }

  get isEnableField() {
    return this.form.controls['isEnable'];
  }

  get sortField() {
    return this.form.controls['sort'];
  }

}
