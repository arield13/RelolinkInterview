import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  step = 1;
  form: FormGroup;
  countries = ['Argentina', 'Mexico'];
  citiesMap: any = {
    Argentina: ['Buenos Aires', 'Rosario'],
    Mexico: ['Ciudad de México', 'Juárez'],
  };
  cityOptions: string[] = [];
  showPayload: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  nextStep() {
    this.showPayload = false;
    let controlName = '';

    switch (this.step) {
      case 1:
        controlName = 'name';
        break;
      case 2:
        controlName = 'lastName';
        break;
      case 3:
        controlName = 'country';
        break;
      case 4:
        controlName = 'city';
        break;
      case 5:
        controlName = 'phoneNumber';
        break;
      case 6:
        controlName = 'email';
        break;
    }

    const control = this.form.get(controlName);
    control?.markAsTouched();

    if (control?.valid) {
      // For step 3, update city + phone logic
      if (this.step === 3) {
        this.cityOptions = this.citiesMap[this.form.value.country];
        this.updatePhonePrefix();
      }
      this.step++;
    }
  }


  prevStep() {
    if (this.step > 1) this.step--;
  }

  updatePhonePrefix() {
    const country = this.form.value.country;
    let prefix = '';
    if (country === 'Argentina') prefix = '+54 ';
    else if (country === 'Mexico') prefix = '+52 ';
    this.form.patchValue({ phoneNumber: prefix });
  }

  submitForm() {
    this.showPayload = true;
    if (this.form.valid) {
      const payload = {
        userInfo: this.form.value,
      };
      console.log("Payload", payload)
      this.http.post('http://localhost:3000/SaveUser', payload).subscribe(
        (res) => {
          alert('User saved successfully!');
        },
        (err) => {
          alert('Error saving user');
          console.error(err);
        }
      );
    } else {
      alert('Please fill all fields correctly.');
    }
  }
}
