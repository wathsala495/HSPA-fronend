import { Component, Input } from '@angular/core';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/models/property';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() properties!: IPropertyBase;
  @Input() hideIcons !:boolean;
}
