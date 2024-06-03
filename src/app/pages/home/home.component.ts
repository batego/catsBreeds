import { CommonModule } from '@angular/common';
import { Component, type OnInit } from '@angular/core';
import { CatBreedsService } from '../../core/services/catBreeds.service';
import { IcatResponse } from './home.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    LoadingComponent
  ],
  providers: [CatBreedsService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  catsData: IcatResponse[] = [];
  PAGE_NUMBER = 1;
  noMoreData = false;
  selectedCat: any = undefined;
  catsBreeds: any[] = [];
  loading!: boolean;


  constructor(private catService: CatBreedsService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.catService.getDropdownsBreeds(), this.catService.getCatBreeds()]).subscribe((resp) => {
      this.catsBreeds = resp[0].map((cat) => {
        return {
          name: cat.breeds[0].name,
          value: cat.breeds[0].id
        }
      });
      this.catsData = resp[1];
      console.log('catsData', this.catsData);
      this.loading = false;
    });
  }

  searchDropdown( event: { name: string, value: string } ) {
    this.loading = true;
    this.catService.getCatBreedById(1, 1, 1, event.value).subscribe((data: IcatResponse[]) => {
      this.catsData = data;
      this.PAGE_NUMBER++;
      this.loading = false;
    });
  }

  loadMore() {
    this.catService.getCatBreeds(this.PAGE_NUMBER, 10, 1).subscribe((data: IcatResponse[]) => {
      if (data.length === 0) this.noMoreData = true;
      this.catsData = [...this.catsData, ...data];
      this.PAGE_NUMBER++;
    });
  }

  showDetail(cat: IcatResponse) {
    this.selectedCat = cat;
    this.router.navigate(['/detail'], { state: cat });
  }

  search(event: any) {
    console.log('event', event);
    this.loading = true;
    this.catService.getCatBreeds(1, 100, 1).subscribe((data: IcatResponse[]) => {
      console.log('data', data);
      this.catsData = data.filter((cat) => cat.breeds[0].name.toLowerCase().includes(event.target.value.toLowerCase()));
      this.loading = false;
    });
  }

}
