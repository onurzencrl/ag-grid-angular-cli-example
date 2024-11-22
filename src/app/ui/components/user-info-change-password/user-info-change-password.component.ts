import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-info-change-password',
  templateUrl: './user-info-change-password.component.html',
  styleUrls: ['./user-info-change-password.component.scss']
})
export class UserInfoChangePasswordComponent implements OnInit {


  ngOnInit(): void {
  }
  activeTabProfile : boolean = true;
  activeTabPassword : boolean = false;
  passwordForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  setTab(tab: string) {
    if (tab === 'profile') {
      this.activeTabProfile = true;
      this.activeTabPassword = false;
    }
    if (tab === 'password') {
      this.activeTabProfile = false;
      this.activeTabPassword = true;
    }
  }

  passwordStrengthValidator(control: any) {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]+/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    if (!valid) {
      return { weakPassword: true };
    }
    return null;
  }

  passwordMatchValidator(group: FormGroup) {
    // const newPassword = group.get('newPassword').value;
    // const confirmPassword = group.get('confirmPassword').value;
    // return newPassword === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const formData = this.passwordForm.value;
      console.log('Form submitted:', formData);
      // Burada şifre değiştirme servisini çağırabilirsiniz
    }
  }

  navigateTo(tab: string) {
    // Sekmeler arasında geçiş yapabilmek için gerekli navigasyon işlemi
    console.log(`Navigating to: ${tab}`);
  }

}
