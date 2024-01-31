import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyModel } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit{
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  public propertyId:number =0;
  property= new PropertyModel();
  item: any;
  constructor(private route:ActivatedRoute,private router:Router,private housingService:HousingService){}
  ngOnInit(): void {

    this.route.data.subscribe(
     (data) => {
      this.property = data['prp'];
    });
  

      // this.property = this.housingService.getProperty(this.propertyId) as PropertyModel;
      // console.log("prop:"+JSON.stringify(this.property))

      // this.route.params.subscribe(
      //   (params)=>{
      //     this.propertyId=+params['id'];
      //     this.housingService.getProperty(this.propertyId).subscribe(
      //       (data )=>{

      //         if (data !== undefined) {
      //           this.property = data as PropertyModel;
      //           console.log("prop:"+ JSON.stringify(this.property.pType))
      //           console.log("prop:"+ JSON.stringify(this.property))
      //         } else {
      //           // Handle the case where data is undefined, if needed.
      //           // For example, set this.property to a default value or handle the error.
      //         }              
      //         // this.property= data
      //         // console.log("prop:"+ JSON.stringify(this.property))
      //       },error =>this.router.navigate(['/'])
      //     )
      //   }
      // )

      this.galleryOptions = [
        {
          width: '100%',
          height: '465px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
        },
        // max-width 800
        
      ];
  
      this.galleryImages = [
        {
          small: 'assets/images/internal_1.jpg',
          medium: 'assets/images/internal_1.jpg',
          big: 'assets/images/internal_1.jpg'
        },
        {
          small: 'assets/images/internal_2.jpg',
          medium: 'assets/images/internal_2.jpg',
          big: 'assets/images/internal_2.jpg'
        },
        {
          small: 'assets/images/internal_3.jpeg',
          medium: 'assets/images/internal_3.jpeg',
          big: 'assets/images/internal_3.jpeg'
        },{
          small: 'assets/images/internal_4.jpg',
          medium: 'assets/images/internal_4.jpg',
          big: 'assets/images/internal_4.jpg'
        },
        {
          small: 'assets/images/internal_5.jpeg',
          medium: 'assets/images/internal_5.jpeg',
          big: 'assets/images/internal_5.jpeg'
        }
      ];
  }
  
  
  onSelectNext(){
    this.propertyId +=1
    this.router.navigate(['property-detail',this.propertyId])
  }

}
