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

  firstnameControl: FormControl;
  lastnameControl: FormControl;
  emailControl: FormControl;
  genderControl: FormControl;


  countryList: any[] = [
    { id: 1, name: 'Italy' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'England' }
  ];

  address: FormArray;


  hideRemoveButton = true;
  showSubmitButton = false;

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





      country: this.formBuilder.group({
        selectedCountry: ['',
          [
            Validators.required
          ]
        ]
      }),




      address: this.formBuilder.array([this.createAddress()], [Validators.required, Validators.minLength(1)])

    });



    this.firstnameControl = <FormControl>this.contactForm.get('firstname');
    this.lastnameControl = <FormControl>this.contactForm.get('lastname');
    this.emailControl = <FormControl>this.contactForm.get('email');
    this.genderControl = <FormControl>this.contactForm.get('gender');


    this.address = this.contactForm.get('address') as FormArray;

  }

  get countryFormGroup() {
    return this.contactForm.get('country') as FormGroup;
  }

  get selectedCountryControl() {
    return this.countryFormGroup.get('selectedCountry');
  }





  createAddress() {
    return this.formBuilder.group({
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

    })
  }

  addAddress() {
    this.address.push(this.createAddress());
    this.showSubmitButton = this.address.controls.length > 0;
  }

  removeAddress() {
    this.address.removeAt(this.address.controls.length - 1);
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

