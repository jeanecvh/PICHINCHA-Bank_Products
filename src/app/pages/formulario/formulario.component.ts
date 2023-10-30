import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/data/services/products.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  registroForm: FormGroup;
  oneYearAfter: any
  oneYearAfterRequest: any
  idLS: string;
  nameLS:string;
  descriptionLS:string;
  logoLS: string;
  fechaLiberacionLS: any;
  fechaRevisionLS:any;
  edit: boolean;
  formSession: any

  constructor(
    @Inject('moment') public moment: any,
    private formBuilder: FormBuilder,
    public productService: ProductsService,
    private router:Router

    ) {}

  ngOnInit() {
    this.formSession = JSON.parse(localStorage.getItem('FormId'))
    if(localStorage.getItem('FormId')){
      this.edit = true;
      this.formSession = JSON.parse(localStorage.getItem('FormId'))
      this.idLS = this.formSession[0]?.id;
      this.nameLS = this.formSession[0]?.name;
      this.descriptionLS = this.formSession[0]?.description;
      this.logoLS = this.formSession[0]?.logo;
      this.fechaLiberacionLS = this.formSession[0]?.date_release
      this.fechaRevisionLS = this.formSession[0]?.date_revision
    }
    this.registroForm = this.formBuilder.group({
      id: [{value: '', disabled: this.edit}, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', [Validators.required, this.validateMinDate.bind(this)]], //
      fechaRevision: [{value: '', disabled: true}] //
    });
   }

   public submitForm() {
    const request = this.getRequest()
      if (this.formSession) {
        this.productService.editProduct(request).subscribe({
          next: () => {
            this.router.navigate([''])
          },
          error: (error) => {
            console.log('error',error);

          }
        })
      } else {
        this.productService.saveProduct(request).subscribe({
          next: () => {
            this.router.navigate([''])
          },
          error: (error) => {
            console.log('error',error);

          }
        })
        console.log(this.registroForm.value);
      }
    }

    getRequest(){
      const request = {
        id: this.id.value,
        name: this.nombre.value,
        description: this.descripcion.value,
        logo: this.logo.value,
        date_release: this.fechaLiberacion.value  + "T00:00:00.000+00:00",
        date_revision: this.oneYearAfterRequest + "T00:00:00.000+00:00"
      }
      return request
    }

    validateMinDate(control: AbstractControl): ValidationErrors | null {
      const fechaLiberacion = new Date(this.moment(this.registroForm?.controls['fechaLiberacion']?.value));
      const fechaRevision = new Date(fechaLiberacion.getFullYear() + 1, fechaLiberacion.getMonth(), fechaLiberacion.getDate());
      const oneYearAfter= this.moment(fechaRevision)?.format('DD-MM-YYYY')
      this.oneYearAfter = this.reemplazarGuionesPorBarras(oneYearAfter);
      const oneYearRequest = this.moment(fechaRevision)?.format('YYYY-MM-DD')
      this.oneYearAfterRequest = oneYearRequest
      return null;
    }

     reemplazarGuionesPorBarras(cadena: string): string {
      const regex = /-/g; // Expresión regular para buscar guiones ("-")
      const resultado = cadena.replace(regex, '/'); // Reemplazar guiones por barras
      return resultado;
    }

    get id() {
      return this.registroForm.get('id');
    }

    get nombre() {
      return this.registroForm.get('nombre');
    }

    get descripcion() {
      return this.registroForm.get('descripcion');
    }

    get logo() {
      return this.registroForm.get('logo');
    }

    get fechaLiberacion() {
      return this.registroForm.get('fechaLiberacion');
    }

    get fechaRevision() {
      return this.registroForm.get('fechaRevision');
    }

    public resetForm() {
      if(localStorage.getItem('FormId')){
        const idValue = this.registroForm.get('id').value;
        this.registroForm.reset();
        this.registroForm.get('id').setValue(idValue);
        console.log('idValue',idValue);

      } else {
        this.registroForm.reset();
      }

    }
  }


