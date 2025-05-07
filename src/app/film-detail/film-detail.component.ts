import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css'],
  standalone: true,
  imports: []
})
export class FilmDetailComponent implements OnInit {
  filmId!: string;
  filmData: any;

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.filmId = this.route.snapshot.paramMap.get('id')!;
    this.loadFilmDetails();
  }
  // b8c0b234
  loadFilmDetails(): void {
    this.http.get(`http://www.omdbapi.com/?i=${this.filmId}&apikey=a3a0d0a0`)
      .subscribe(data => this.filmData = data);
  }
}
