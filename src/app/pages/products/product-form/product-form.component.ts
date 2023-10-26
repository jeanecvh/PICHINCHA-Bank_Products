import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

   registroForm = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
    descripcion: new FormControl(),
    logo: new FormControl(),
    fechaLiberacion: new FormControl(),
    fechaRevision: new FormControl(),
  });


  constructor(
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    // this.loadForm()
  }

  loadForm(){
    // this.registroForm = this.fb.group({
    //   id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    //   nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    //   descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    //   logo: ['', [Validators.required]],
    //   fechaLiberacion: ['', [Validators.required, this.validateMinDate.bind(this)]],
    //   fechaRevision: ['', [Validators.required, this.validateYearAfter.bind(this)]]
    // });
  }

  submitForm() {
    if (this.registroForm.valid) {
      // Realizar acciones con los datos del formulario (enviar al servidor, etc.)
      console.log(this.registroForm.value);
    }
  }

  // validateMinDate(control: AbstractControl): ValidationErrors | null {
  //   const selectedDate = new Date(control.value);
  //   const currentDate = new Date();

  //   if (selectedDate < currentDate) {
  //     return { minDate: true };
  //   }

  //   return null;
  // }

  // validateYearAfter(control: AbstractControl): ValidationErrors | null {
  //   debugger
  //   const fechaLiberacion = new Date(this.registroForm.get('fechaLiberacion').value);
  //   const fechaRevision = new Date(control.value);
  //   const oneYearAfter = new Date(fechaLiberacion.getFullYear() + 1, fechaLiberacion.getMonth(), fechaLiberacion.getDate());

  //   if (fechaRevision.getTime() !== oneYearAfter.getTime()) {
  //     return { yearAfter: true };
  //   }

  //   return null;
  // }

  // get id() {
  //   return this.registroForm.get('id');
  // }

  // get nombre() {
  //   return this.registroForm.get('nombre');
  // }

  // get descripcion() {
  //   return this.registroForm.get('descripcion');
  // }

  // get logo() {
  //   return this.registroForm.get('logo');
  // }

  // get fechaLiberacion() {
  //   return this.registroForm.get('fechaLiberacion');
  // }

  // get fechaRevision() {
  //   return this.registroForm.get('fechaRevision');
  // }
}
