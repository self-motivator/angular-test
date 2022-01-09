import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { map } from 'rxjs';
import { CharacterStateService } from 'src/app/services/character.state.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  private chractersData$ = this.chStateService.chracters$;
  characters$ = this.chractersData$.pipe(map((p) => p?.results));
  pageLength$ = this.chractersData$.pipe(map((p) => p?.total));

  searchKey = new FormControl('');

  constructor(private chStateService: CharacterStateService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  onChangePage(): void {
    this.onSearchCharacters();
  }

  onSearchCharactor(): void {
    this.paginator.pageIndex = 0;
    this.onSearchCharacters();
  }

  private onSearchCharacters(): void {
    if (this.searchKey.value.trim().length === 0) return;

    this.chStateService.getChracters(
      this.searchKey.value,
      this.paginator.pageIndex * this.paginator.pageSize,
      this.paginator.pageSize
    );
  }
}
