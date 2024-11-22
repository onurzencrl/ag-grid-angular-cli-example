import { Component, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/admin/components/campaign/campaign.service';
import { Service, ServiceModel } from 'src/app/admin/components/service/service-model';
import { ServiceService } from 'src/app/admin/components/service/service.service';
import { Testimonial, TestimonialModel } from 'src/app/admin/components/testimonial/testimonial-model';
import { TestimonialService } from 'src/app/admin/components/testimonial/testimonial.service';

@Component({
  selector: 'app-services-testimonials',
  templateUrl: './services-testimonials.component.html',
  styleUrls: ['./services-testimonials.component.scss']
})
export class ServicesTestimonialsComponent implements OnInit {

  constructor(private readonly testimonialService : TestimonialService ,private campaignService : CampaignService , private readonly servicesService : ServiceService) { }

  ngOnInit(): void {
    this.getTestimonails();
    this.getServices();
    this.getCampaigns();
  }

  campaigns: any[] = [];
  getCampaigns(){
    this.campaignService.getCampaigns(0, 10).subscribe((data: any) => {
      this.campaigns = data.items;
    });
  }
    
  testimonials: TestimonialModel[] = [];
  services: ServiceModel[] = [];
  getTestimonails(){
    this.testimonialService.getTestimonials(0, 10).subscribe((data: any) => {
      this.testimonials = data.items;
    });
  }

  getServices(){
    this.servicesService.getServices(0,10).subscribe((data: any) => {
      this.services = data.items;
    });
  }

}
