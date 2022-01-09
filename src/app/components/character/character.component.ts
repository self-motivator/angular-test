import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterStateService } from 'src/app/services/character.state.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  id!: number;
  private sub!: Subscription;
  character$ = this.chStateService.character$;

  constructor(
    private chStateService: CharacterStateService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
    });
  }

  ngAfterViewInit(): void {
    this.chStateService.getChracter(this.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
