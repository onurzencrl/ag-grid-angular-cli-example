import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsettingModel } from 'src/app/admin/components/contactsetting/contactsetting-model';
import { ContactsettingService } from 'src/app/admin/components/contactsetting/contactsetting.service';
import { AuthService } from 'src/app/admin/components/login/auth.service';

@Component({
  selector: 'app-user-info-profile',
  templateUrl: './user-info-profile.component.html',
  styleUrls: ['./user-info-profile.component.scss']
})
export class UserInfoProfileComponent implements OnInit {
  activeTabProfile : boolean = true;
  activeTabPassword : boolean = false;
  activeTab: string = 'profile'; // Varsayılan olarak profil sekmesi açık


  ngOnInit(): void {
    this.contactProfileFormInit();
    this.getContactSettings();
    this.contactFormInit();

    this.contactSettingsForm.valueChanges.subscribe(value => {
      this.saveContactSettings();
    });
    this.getUserInfo();
  }
  getUserInfo() {
    var userId = localStorage.getItem('userId');
    this.authService.getUserById(userId!).subscribe(
      response => {
        this.contactProfileInfoForm.patchValue(response);      },
      error => {
        console.error('Kullanıcı bilgileri alınamadı:', error);
      }
    );
  }
  currentTab: string = 'profile';

  // activeTab: string = 'profile'; // Varsayılan olarak "profile" sekmesi seçili

  setTab(tab: string) {
    this.activeTab = tab; // Tıklanan sekmeye göre aktif tab'ı ayarla
  }

  navigateTo(tab: string) {
    // Sekmeler arasında geçiş yapabilmek için gerekli navigasyon işlemi
    console.log(`Navigating to: ${tab}`);
  }

  passwordForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private contactSettingService: ContactsettingService) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });

  }

  contactSettingsForm!: FormGroup;
  contactProfileInfoForm!: FormGroup;

  contactFormInit() {
    this.contactSettingsForm = this.fb.group({
      sendSms : [false],
      sendEmail : [false],
      calling : [false],
    });
  } 
  
  contactProfileFormInit() {
    this.contactProfileInfoForm = this.fb.group({
      id: ['', ],
      firstName: ['', ],
      lastName: ['', ],
      gender: [''],
      email: [''],
      phoneNumber: [''],
      dateBirth: [, ]
    });
  }
  contactSettings : ContactsettingModel = new ContactsettingModel();
  isContactSettingsLoaded: boolean = false;
  saveContactSettings() { 
    if(this.isContactSettingsLoaded)
    {
      this.contactSettings.sendSms = this.contactSettingsForm.get('sendSms')?.value;
      this.contactSettings.sendEmail = this.contactSettingsForm.get('sendEmail')?.value;
      this.contactSettings.calling = this.contactSettingsForm.get('calling')?.value;
      this.contactSettings.userId = localStorage.getItem('userId')!;

      this.contactSettingService.updateContactsetting(this.contactSettings).subscribe(
        response => {
          console.log('İletişim ayarları güncellendi:', response);
          // Başarılı mesajı ver
        },
        error => {
          console.error('İletişim ayarları güncellenirken bir hata oluştu:', error);
          // Hata mesajı ver

        }
      );
    }
    else
    {
      this.contactSettings.sendSms = this.contactSettingsForm.get('sendSms')?.value;
      this.contactSettings.sendEmail = this.contactSettingsForm.get('sendEmail')?.value;
      this.contactSettings.userId = localStorage.getItem('userId')!;
      this.contactSettings.calling = this.contactSettingsForm.get('calling')?.value;
      this.contactSettingService.createContactsetting(this.contactSettings).subscribe(
        response => {
          console.log('İletişim ayarları oluşturuldu:', response);
          this.getContactSettings();
          // Başarılı mesajı ver
        },
        error => {
          console.error('İletişim ayarları oluşturulurken bir hata oluştu:', error);
          // Hata mesajı ver
        });
   

  }

}


  getContactSettings() {
    var userId = localStorage.getItem('userId');
    this.contactSettingService.getContactsettingById(userId!.toString()).subscribe(
      response => {
        console.log('İletişim ayarları:', response);
        this.contactSettingsForm.patchValue(response);
        this.contactSettings = response;
        // İletişim ayarlarını form kontrollerine doldur
        this.isContactSettingsLoaded = true;

      },
      error => {
        console.error('İletişim ayarları alınamadı:', error);
        this.isContactSettingsLoaded = false;

      }
    );
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      // Yeni şifre ve tekrar şifresinin eşleşip eşleşmediğini kontrol et
      if (newPassword !== confirmPassword) {
        this.errorMessage = 'Şifreler uyuşmuyor.';
        return;
      }

      // Şifre değiştirme isteğini servise gönder
      this.authService.resetPassword(currentPassword, newPassword).subscribe(
        response => {
          console.log('Şifre başarıyla değiştirildi', response);
          // Başarılı mesajı ver veya sayfayı yönlendir
        },
        error => {
          console.error('Şifre değiştirme hatası:', error);
          this.errorMessage = 'Şifre değiştirilirken bir hata oluştu.';
        }
      );
    }
  }


  onSubmitProfileInfo() {
    if (this.contactSettingsForm.valid) {
      const { firstName, lastName, email, phoneNumber, dateBirth } = this.contactProfileInfoForm.value;
      const id = localStorage.getItem('userId');
      this.authService.updateProfile({
        firstName,
        lastName,
        id,
        email,
        phoneNumber,
        dateBirth
      }).subscribe(
        response => {
          console.log('Profil başarıyla güncellendi', response);
        },
        error => {
          console.error('Profil güncelleme hatası:', error);
          this.errorMessage = 'Profil güncellenirken bir hata oluştu.';
        }
      );
    } else {
      this.errorMessage = 'Lütfen tüm alanları doğru doldurunuz.';
    }
  }
  
}
