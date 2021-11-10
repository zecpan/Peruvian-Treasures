import { Component } from '@angular/core';
import { Adventurer } from 'src/app/model/adventurer';
import { Map } from 'src/app/model/map';
import { Mountain } from 'src/app/model/mountain';
import { Treasur } from 'src/app/model/treasur';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  carte: Map | undefined;
  isMapLoaded: boolean = false;
  constructor(@Inject(DOCUMENT) document: any) {
    document.getElementById('el');
  }

  initMap() {
    //Load MapFile by name
    console.log('Chargement de la carte');
    this.carte = new Map(
      'C',
      3,
      4,
      new Array<Mountain>(
        new Mountain('M', 0, 2),
        new Mountain('M', 1, 2),
        new Mountain('M', 3, 1),
        new Mountain('M', 1, 2)
      ),
      new Array<Treasur>(
        new Treasur('T', 0, 0, 3),
        new Treasur('T', 0, 1, 2),
        new Treasur('T', 1, 1, 1),
        new Treasur('T', 1, -1, 1),
        new Treasur('T', 0, 1, 2)
      ),
      new Array<Adventurer>(
        new Adventurer('A', 'Indianna Jones', 2, 1, 'O', 'AADAGGAGA', 0),
        new Adventurer('A', 'Donald Trump', 2, 2, 'T', 'ADADADGAA', 0)
      )
    );
    console.log(this.carte.toString());
    this.isMapLoaded = true;
  }

  start() {
    if (this.carte != undefined)
      for (const adventurer of this.carte.adventurers) {
        adventurer.startMotion(this.carte);
      }
  }

  exportMapFile() {
    // Export the actual Map to a file format
    console.log('Export de la carte');
    if (this.carte != undefined) console.log(this.carte.toString());
  }

  public onChange(event: any): void {
    var file: File = event.target?.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = function (x) {
      var lines = fileReader.result?.toString().split(/\r?\n/);
      console.log(fileReader.result);
      if (lines != undefined)
        for (const line of lines) {
          console.log(line);
        }
    };
    fileReader.readAsText(file);
  }
}
