import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories  = [
    {
      cid: 22,
      title: 'PROGRAMMING 1',
      description: 'Mew 1 mew 1 mew 1 mew 1 mew 1 mew',
    },
    {
      cid: 23,
      title: 'PROGRAMMING 2',
      description: 'Mew 2 mew 2 mew 2 mew 2 mew 2 mew',
    },
    {
      cid: 24,
      title: 'PROGRAMMING 3',
      description: 'Mew 3 mew 3 mew 3 mew 3 mew ',
    },
    {
      cid: 25,
      title: 'PROGRAMMING 4',
      description: 'Mew 4 mew 4 mew 4 mew 4 mew 4 mew',
    },
  ]

  constructor(private _category: CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any) => {
      this.categories = data;
      console.log(this.categories);

  },
  (error) => {
    console.log(error);
    Swal.fire("Error!!", "Error in loading data","error")
  });

}
}
