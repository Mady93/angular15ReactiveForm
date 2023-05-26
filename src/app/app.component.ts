import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ReactiveForm';

  contactForm: FormGroup;

  firstnameControl: FormControl;
  lastnameControl: FormControl;
  emailControl: FormControl;
  genderControl: FormControl;
  isMarriedControl: FormControl;

  /* constructor() {

    this.contactForm = new FormGroup({

      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      isMarried: new FormControl(false)
    });
  } */


  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({

      firstname: [
        null,
        [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
        ],
      ],

      lastname: [
        '',
        [
          Validators.minLength(2),
          Validators.pattern('^[a-zA-Z]+$'),
          Validators.required,
        ],
      ],

      email: [
        '',
        [
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9-.]+.[a-z]{2,}$'),
          Validators.required,
        ],
      ],

      gender: ['', Validators.required],

      isMarried: [false, Validators.required],
    });


    //this.firstnameControl = this.contactForm.get('firstname') as FormControl;
    this.firstnameControl = <FormControl>this.contactForm.get('firstname');

    this.lastnameControl = <FormControl>this.contactForm.get('lastname');
    this.emailControl = <FormControl>this.contactForm.get('email');
    this.genderControl = <FormControl>this.contactForm.get('gender');
    this.isMarriedControl = <FormControl>this.contactForm.get('isMarried');


  }


  onSubmit() {

    alert(this.contactForm.invalid);

    if (this.contactForm.valid) {
      alert(this.contactForm.valid);
      return console.log(this.contactForm.value);
    }
    
  }
} 
