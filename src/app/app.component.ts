import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Reactive Form';


  contactForm: FormGroup;

  countryList: any[] = [
    { id: 1, name: 'Italy' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'England' }
  ];




  constructor(private formBuilder: FormBuilder) {

    this.contactForm = this.formBuilder.group({

      firstname: [
        '',
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





      address: this.formBuilder.group({
        country: ['',
          [
            Validators.required
          ]
        ],
        city: ['',
          [
            Validators.minLength(2),
            Validators.pattern('^[^0-9]*$'),
            Validators.required
          ]
        ],
        street: ['', [

          Validators.minLength(2),
          Validators.pattern('^[^0-9]*$'),
          Validators.required
        ]
        ],
        zipCode: ['', [
          Validators.minLength(4),
          Validators.pattern('^[0-9]*$'),
          Validators.required
        ]
        ]

      }),

    });



  }





  get firstnameControl() {
    return this.contactForm.get('firstname');
  }

  get lastnameControl() {
    return this.contactForm.get('lastname');
  }

  get emailControl() {
    return this.contactForm.get('email');
  }

  get genderControl() {
    return this.contactForm.get('gender');
  }

  get countryControl() {
    return this.contactForm.get('address.country');
  }

  get cityControl() {
    return this.contactForm.get('address.city');
  }

  get streetControl() {
    return this.contactForm.get('address.street');
  }

  get zipCodeControl() {
    return this.contactForm.get('address.zipCode');
  }






  onSubmit() {


    if (this.contactForm.invalid) {
      alert('Form is invalid');
    } else {
      alert('Form is valid');
      console.log(this.contactForm.value);
      this.contactForm.reset();
    }
  }








  // logica css per il bottone submit
  calculateAngle(e: MouseEvent, item: HTMLElement, parent: HTMLElement): void {
    let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
    if (parent.getAttribute('data-filter-color') !== null) {
      dropShadowColor = parent.getAttribute('data-filter-color')!;
    }

    const rect = item.getBoundingClientRect();
    const x = Math.abs(rect.x - e.clientX);
    const y = Math.abs(rect.y - e.clientY);

    const halfWidth = rect.width / 2;
    const halfHeight = rect.height / 2;

    const calcAngleX = (x - halfWidth) / 6;
    const calcAngleY = (y - halfHeight) / 4;

    item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.15)`;

    parent.style.perspective = `${halfWidth * 2}px`;
    item.style.perspective = `${halfWidth * 3}px`;

    if (parent.getAttribute('data-custom-perspective') !== null) {
      parent.style.perspective = parent.getAttribute('data-custom-perspective')!;
    }

    const calcShadowX = (x - halfWidth) / 3;
    const calcShadowY = (y - halfHeight) / 3;

    item.style.filter = `drop-shadow(${-calcShadowX}px ${calcShadowY}px 15px ${dropShadowColor})`;
  }

  ngAfterViewInit(): void {
    const buttons = document.querySelectorAll('.button');

    buttons.forEach((item: HTMLElement) => {
      item.addEventListener('mouseenter', (e: MouseEvent) => {
        this.calculateAngle(e, item.querySelector('span') as HTMLElement, item);
      });

      item.addEventListener('mousemove', (e: MouseEvent) => {
        this.calculateAngle(e, item.querySelector('span') as HTMLElement, item);
      });

      item.addEventListener('mouseleave', () => {
        let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
        if (item.getAttribute('data-filter-color') !== null) {
          dropShadowColor = item.getAttribute('data-filter-color')!;
        }
        const span = item.querySelector('span') as HTMLElement;
        span.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        span.style.filter = `drop-shadow(0 5px 10px ${dropShadowColor})`;
      });
    });
  }

}

