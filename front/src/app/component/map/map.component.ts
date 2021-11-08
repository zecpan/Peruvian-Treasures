import { Component, OnInit } from '@angular/core';
import { Adventurer } from 'src/app/model/adventurer';
import { Map } from 'src/app/model/map';
import { Mountain } from 'src/app/model/mountain';
import { Treasur } from 'src/app/model/treasur';

let carte: Map;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  initMap() {
    //Load MapFile by name
    console.log('Chargement de la carte');
    carte = new Map(
      'C',
      3,
      4,
      new Array<Mountain>(
        new Mountain('M', 0, 2),
        new Mountain('M', 1, 1),
        new Mountain('M', 3, 1),
        new Mountain('M', 1, 1)
      ),
      new Array<Treasur>(
        new Treasur('T', 0, 0, 3),
        new Treasur('T', 0, 1, 2),
        new Treasur('T', 1, 1, 1),
        new Treasur('T', 1, -1, 1),
        new Treasur('T', 0, 1, 2)
      ),
      new Array<Adventurer>(
        new Adventurer('A', 'TOTO', 2, 2, 'S', 'ADADADGAA', 0)
      )
    );
  }

  exportMapFile() {
    // Export the actual Map to a file format
    console.log('Export de la carte');
    console.log(carte.toSting());
  }
}
