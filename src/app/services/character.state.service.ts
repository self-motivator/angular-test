import { Injectable } from '@angular/core';
import { CHARACTER, RESULT_DATA } from '../model/character';
import { CharacterApiService } from './chracter.api.service';
import { StateService } from './state.service';

interface CharacterState {
  chracters?: RESULT_DATA;
  chracter?: CHARACTER;
}

const initialState: CharacterState = {
  chracters: undefined,
  chracter: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class CharacterStateService extends StateService<CharacterState> {
  constructor(private apiService: CharacterApiService) {
    super(initialState);
  }

  chracters$ = this.select((state) => state.chracters);
  chracter$ = this.select((state) => state.chracter);

  getChracters(keywords: string, offset: number = 0, limit: number = 10): void {
    this.apiService
      .getCharacters(keywords ?? '', offset, limit)
      .subscribe((res) => this.setState({ chracters: res.data }));
  }

  getChracter(id: number): void {
    this.apiService.getCharacter(id).subscribe((res) =>
      this.setState({
        chracter:
          res.data.results.length === 1 ? res.data.results[0] : undefined,
      })
    );
  }
}
