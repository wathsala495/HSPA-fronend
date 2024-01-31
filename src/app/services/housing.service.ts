import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Property } from '../models/property';
import { IPropertyBase } from '../model/ipropertybase';
import { IProperty } from '../model/iproperty';
import { PropertyModel } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllCities():Observable<string[]>{
    return this.http.get<string[]>('http://localhost:5095/api/city');
  }

     getProperty(id:number){
      return this.getAllProperties().pipe(
        map(propertiesArray=>{
         // throw new Error('Some error');
          return  propertiesArray.find(p=>p.Id ===id)
        })
      )

    //   const dataString = localStorage.getItem('newProp');
    // if (dataString) {
    //   const data = JSON.parse(dataString);
    //   const item:IPropertyBase |undefined = data.find((item:IPropertyBase) => item.Id === id);
    //   return item;
    // }
    // return null; 
     }

  getAllProperties(SellRent?:number):Observable<PropertyModel[]>{
    return this.http.get('data/properties.json').pipe(
      map((data:any)=>{
        const propertyArray:Array<PropertyModel>=[];
       
        const localPropertiesJSON = localStorage.getItem('newProp');
       // console.log("local:"+localPropertiesJSON)
        
        
        if (localPropertiesJSON !== null) {
          
          let localProperties = JSON.parse(localPropertiesJSON);
          if(localProperties){
            for(const id in localProperties){
              if(SellRent){
             
              if (localProperties.hasOwnProperty(id)  && localProperties[id].SellRent === SellRent) {
                propertyArray.push((localProperties as any)[id] as PropertyModel) ;
              }
            }else{
              propertyArray.push((localProperties as any)[id] as PropertyModel) ;
            }
              
              
            }
          }
  
        }
        for(const id in data){
          if(SellRent){
          if(data.hasOwnProperty(id) && data[id].SellRent===SellRent){
            propertyArray.push((data as any)[id] as PropertyModel)      
          }
        }else{
          propertyArray.push((data as any)[id] as PropertyModel)
        }
        }
        
       return propertyArray
      })
    );
    return this.http.get<PropertyModel[]>('data/properties.json')

  }
  addProperty(property:PropertyModel){
    let newProp=[property];
    const storedNewProp = localStorage.getItem('newProp');
if (storedNewProp !== null) {
  newProp = [property, ...JSON.parse(storedNewProp)];
} else {
  newProp = [property];
}
    localStorage.setItem('newProp',JSON.stringify(newProp))

  }
  newPropID(){
    // Get the current PID from local storage and increment it
let currentPID = localStorage.getItem('PID');
if (currentPID !== null) {
  
  const incrementedPID = String(Number(currentPID) + 1);
  localStorage.setItem('PID', incrementedPID);

  // Return the incremented PID
  return +incrementedPID;
} else {
  // Handle the case when 'PID' is not present in local storage or is null
  // You can set an initial value or take any other appropriate action
  localStorage.setItem('PID', '101'); // Set an initial value, assuming 'PID' is a number
  return 1; // Return 1 as the initial PID
}

    // if(localStorage.getItem('PID')){
      
    //   localStorage.setItem('PID',String(+localStorage.getItem('PID')+1));
    //   return +localStorage.getItem('PID');
    // }
    // else{
    //   localStorage.setItem('PID','101')
    // }
  }
}
