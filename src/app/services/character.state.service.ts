import { Injectable } from '@angular/core';
import { CHARACTER, RESULT_DATA } from '../model/character';
import { CharacterApiService } from './chracter.api.service';
import { StateService } from './state.service';

interface CharacterState {
  chractersData?: RESULT_DATA;
  character?: CHARACTER;
}

const initialState: CharacterState = {
  chractersData: undefined,
  character: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class CharacterStateService extends StateService<CharacterState> {
  constructor(private apiService: CharacterApiService) {
    super(initialState);
  }

  chractersData$ = this.select((state) => state.chractersData);
  character$ = this.select((state) => state.character);

  getChracters(keywords: string, offset: number = 0, limit: number = 10): void {
    this.apiService
      .getCharacters(keywords ?? '', offset, limit)
      .subscribe((res) => this.setState({ chractersData: res.data }));
  }

  getChracter(id: number): void {
    this.apiService.getCharacter(id).subscribe((res) =>
      this.setState({
        character:
          res.data.results.length === 1 ? res.data.results[0] : undefined,
      })
    );
  }
}
