
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProperty } from 'src/app/model/iproperty';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/services/housing.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  
 //properties: any;
 filterText: string = '';
 cityFilter = '';
 properties: Array<IPropertyBase> = [];
 City='';
 SearchCity='';
 SortDerection='asc';

 SortbyParam=''

 sortOption = '';
 private subscription: Subscription = new Subscription();

 constructor(private route:ActivatedRoute,private housingService:HousingService){}
  SellRent = 1;
  ngOnInit(): void {
      
  //  this.http.get('data/properties.json').subscribe(
  //   data=>{
  //     this.properties=data
  //     console.log(data);
   

  //   }
  //  );
  if(this.route.snapshot.url.toString()){
    this.SellRent=2;
  }
  // this.housingService.getAllProperties(this.SellRent).subscribe(
  //   data=>{
  //     this.properties=data;
  //     const newPropertyJson = localStorage.getItem('newProp');
  //    // const newProperty =JSON.parse(newPropertyJson)
  //     if (newPropertyJson) {
  //      let newProperty = JSON.parse(newPropertyJson);
  //      if(newProperty.SellRent==this.SellRent){
  //       this.properties=[newProperty, ...this.properties]
  //      }
  //     } else {
        
  //       let newProperty = null; // Or provide a default value or take appropriate action
  //     }
     
  //     console.log("properties:"+this.properties)
      
  //   },
  //   error=>
  //   console.log(error)
    
  // )

  this.subscription = this.housingService.getAllProperties(this.SellRent).subscribe({
    next: (data) => {
      this.properties = data;
      console.log("thisProperties:", this.properties);

      const newPropertyJson = localStorage.getItem('newProp');
      if (newPropertyJson) {
        const newProperty = JSON.parse(newPropertyJson);
        console.log("new:"+newProperty)
        if (newProperty.SellRent == this.SellRent) {
          this.properties=[newProperty, ...this.properties]
        }
      }
    },
    error: (error) => console.log(error)
  });
      
  }
  filteredItems = this.properties;
 

  // applyFilter() {
  //   this.filteredItems = this.properties.filter(item =>
  //     item.City &&  item.City.toLowerCase().includes(this.cityFilter.toLowerCase())
  //   );
  // }

  onCityFilter(){

     this.SearchCity = this.City;
  }
  onCityFilterClear(){
    this.SearchCity='';
    this.City='';
  }

  sortData() {
    if (this.sortOption === 'City') {
      this.properties.sort((a, b) =>( a.City ?? '').localeCompare(b.City ?? ''));
    } else if (this.sortOption === 'Price') {
      this.properties.sort((a, b) => (a.Price ?? 0) - (b.Price ?? 0));
    }
  }

  onSortDirection(){
    if(this.SortDerection==='desc'){
      this.SortDerection='asc'
    }
    else[
      this.SortDerection='desc'
    ]
  }

}
