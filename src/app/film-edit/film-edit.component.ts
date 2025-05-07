import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../modules/material.module';
import { Film } from '../../entities/film';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-film-edit',
  standalone: true,
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
})
export class FilmEditComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private filmService = inject(FilmsService);

  filmForm!: FormGroup;
  filmId: string | null = null;

  ngOnInit(): void {
    this.filmForm = this.fb.group({
      id: [''],
      nazov: ['', Validators.required],
      rok: ['', Validators.required],
      slovenskyNazov: [''],
      afi1998: [''],
      afi2007: ['']
    });

    this.filmId = this.route.snapshot.paramMap.get('id');

    if (this.filmId && this.filmId !== 'new') {
      this.filmService.getFilmById(this.filmId).subscribe((film: Film) => {
        this.filmForm.patchValue(film);
      });
    }
  }

  onSubmit(): void {
    if (this.filmForm.valid) {
      const film = this.filmForm.value as Film;

      if (this.filmId && this.filmId !== 'new') {
        this.filmService.updateFilm(film).subscribe(() => this.router.navigate(['/films']));
      } else {
        this.filmService.addFilm(film).subscribe(() => this.router.navigate(['/films']));
      }
    }
  }
}
