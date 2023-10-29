import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  registroForm: FormGroup;
  oneYearAfter: any

  constructor(
    @Inject('moment') private moment: any,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', [Validators.required, this.validateMinDate.bind(this)]], //
      fechaRevision: [{value: '', disabled: true}] //
    });
   }

   public submitForm() {
      if (this.registroForm.valid) {
        // Realizar acciones con los datos del formulario (enviar al servidor, etc.)
        console.log(this.registroForm.value);
      }
    }

    validateMinDate(control: AbstractControl): ValidationErrors | null {
      const fechaLiberacion = new Date(this.moment(this.registroForm?.controls['fechaLiberacion']?.value));
      const fechaRevision = new Date(fechaLiberacion.getFullYear() + 1, fechaLiberacion.getMonth(), fechaLiberacion.getDate());
      const oneYearAfter= this.moment(fechaRevision).format('DD-MM-YYYY')
      this.oneYearAfter = this.reemplazarGuionesPorBarras(oneYearAfter);
      return null;
    }

     reemplazarGuionesPorBarras(cadena: string): string {
      const regex = /-/g; // Expresión regular para buscar guiones ("-")
      const resultado = cadena.replace(regex, '/'); // Reemplazar guiones por barras
      return resultado;
    }

    // validateYearAfter(control: AbstractControl): ValidationErrors{

    //   const fechaLiberacion = new Date(this.registroForm?.controls['fechaLiberacion']?.value);
    //   const fechaRevision = new Date(control.value);
    //   this.oneYearAfter = new Date(fechaLiberacion.getFullYear() + 1, fechaLiberacion.getMonth(), fechaLiberacion.getDate());
    //   console.log('fechaLiberacion',fechaLiberacion)
    //   console.log('fechaRevision',fechaRevision)
    //   console.log('oneYearAfter',this.oneYearAfter)

    //   return null;
    // }

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


  }


