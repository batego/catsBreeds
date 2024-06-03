import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { CatBreedsService } from '../../core/services/catBreeds.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [
    CommonModule,
    GalleriaModule,
    CardModule,
    ButtonModule
  ],
  templateUrl: './catDetail.component.html',
  styleUrl: './catDetail.component.css',
})
export class CatDetailComponent implements OnInit{
  catDetailData: any;
  dataBreeds: any;
  galleryImages: any[] = [];
  responsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];

  constructor(private router: Router, private catService: CatBreedsService) {
    this.catDetailData = this.router.getCurrentNavigation()?.extras.state;


  }

  ngOnInit(): void {
    this.dataBreeds = this.catDetailData.breeds[0];
    let id = this.catDetailData.breeds[0].id
    console.log('catDetailData', this.dataBreeds);
    this.catService.getCatBreedById(1, 100, 1, id).subscribe((data: any) => {
      this.galleryImages = data.map((img: any) => {
        return {
          previewImageSrc: img.url,
          thumbnailImageSrc: img.url,
          alt: img.id
        }
      });

    });
  }

  goToLink(name: string){
    window.open(`https://es.wikipedia.org/wiki/${name}`, "_blank");
}
}
