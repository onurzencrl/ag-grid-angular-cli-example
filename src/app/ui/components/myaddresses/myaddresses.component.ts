import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressesService } from 'src/app/admin/components/addresses/addresses.service';
import { CityService } from 'src/app/admin/components/city/city.service';
import { DistrictService } from 'src/app/admin/components/district/district.service';
import { NeighbourhoodService } from 'src/app/admin/components/neighbourhood/neighbourhood.service';
@Component({
  selector: 'app-myaddresses',
  templateUrl: './myaddresses.component.html',
  styleUrls: ['./myaddresses.component.scss']
})
export class MyaddressesComponent implements OnInit {


  ngOnInit(): void {  
    this.initForm(); // Formu başlat
    this.getCities();
    this.getDistricts();
    this.getNeighbourhoods();
    this.getAdresses();
}
  activeTabProfile : boolean = true;
  activeTabPassword : boolean = false;
  passwordForm!: FormGroup;

  constructor(private cityService: CityService , private neighbourhoodService: NeighbourhoodService , private districtService: DistrictService , private fb: FormBuilder, private adressesService: AddressesService  ) { 
}
addresses: any[] = [];
getAdresses() {
    this.adressesService.getAddressess(0, 100).subscribe((response: any) => {
      this.addresses = response.items;
    });
  }

  showAddressPopup: boolean = false;
  addressForm!: FormGroup; // Reactive Form Grubu
  cityList: any[] = [];
  districtList: any[] = [];
  neighbourhoodList: any[] = [];
  getCities() {
    this.cityService.getCitys(0, 100).subscribe((response: any) => {
      this.cityList = response.items;
    });
  }
  closeAddressPopup() {
    this.showAddressPopup = false;
  }
  
  openAddressPopup() {
    this.showAddressPopup = true; // Adres ekleme popup'ını aç
  }

  onSubmitAddress() {
    console.log(this.addressForm.value);
    if(this.addressForm.value.id)
    {

        const newAddress = this.addressForm.value; // Form verilerini al
        this.adressesService.updateAddresses(newAddress).subscribe(response => {
          console.log('Adres başarıyla güncellendi:', response);
          this.getAdresses();
          this.showAddressPopup = false;
          this.addressForm.reset();

        }, error => {
          console.error('Adres güncellenirken hata oluştu:', error);
        });
    
    }
    else
    {
        if (this.addressForm.valid) {
          const newAddress = this.addressForm.value; // Form verilerini al
          newAddress.userId = localStorage.getItem('userId');
          this.adressesService.createAddresses(newAddress).subscribe(response => {
            console.log('Adres başarıyla kaydedildi:', response);
            this.getAdresses();
            this.showAddressPopup = false;
            this.addressForm.reset();
          }, error => {
            console.error('Adres kaydedilirken hata oluştu:', error);
          });
        } else {
          console.log("Form geçerli değil");
        }
    }
  }


  getDistricts() {
    this.districtService.getDistricts(0, 100).subscribe((response: any) => {
      this.districtList = response.items;
    });
  }

  getNeighbourhoods() {
    this.neighbourhoodService.getNeighbourhoods(0, 100).subscribe((response: any) => {
      this.neighbourhoodList = response.items;
    });
  }

  initForm() {
    this.addressForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      cityId: [''],
      districtId: [''],
      neighbourhoodId: [''],
      detailedAddress: ['', Validators.required],
      titleOfAddress: ['', Validators.required]
    });


  }

  editAdress(id:number) {
    this.showAddressPopup = true;
    this.adressesService.getAddressesByAddressId(id.toString()).subscribe((response: any) => {
        this.addressForm.patchValue(response);
        this.addressForm
    })
}

deleteAddress(id: number) {
    this.adressesService.deleteAddresses(id).subscribe(response => {
      console.log('Adres başarıyla silindi:', response);
      this.getAdresses();
    }, error => {
      console.error('Adres silinirken hata oluştu:', error);
    });
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
