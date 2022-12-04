import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories  = [
    {
      cid: 0,
      title: '',
      description: '',
    },
  ]
  constructor(private _cat: CategoryService, private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._cat.categories().subscribe((data:any) => {
      this.categories = data;

  },
  (error) => {
    this._snack.open( 'Error in loading data', '',{
      duration: 3000,
    });
  
  }
  );
  }
}
