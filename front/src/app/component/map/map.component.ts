import { Component } from '@angular/core';
import { Adventurer } from 'src/app/model/adventurer';
import { DefaultCoordinate } from 'src/app/model/defaultCoordinate';
import { Coordinates } from 'src/app/model/interfaces/coordinates';
import { Map } from 'src/app/model/map';
import { Mountain } from 'src/app/model/mountain';
import { Treasur } from 'src/app/model/treasur';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  carte: Map | undefined;
  isMapLoaded: boolean = false;
  arrayOfMountain: Array<Mountain> = new Array<Mountain>();
  arrayOfTreasures: Array<Treasur> = new Array<Treasur>();
  arrayOfAdventurers: Array<Adventurer> = new Array<Adventurer>();
  fileReaderReady: FileReader | undefined;
  arrayOfWidth: Array<number> | undefined;
  arrayOfHeight: Array<number> | undefined;
  arrayOfAllCoordinates: Array<Coordinates> | undefined;

  initMap() {
    this.createMap();
    if (this.carte == undefined) {
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
    }

    this.displayMap();
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
    if (this.carte != undefined) {
      console.log(this.carte.toString());

      var file = new Blob([this.carte.toString()], { type: '.txt' });

      // Others
      var a = document.createElement('a'),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download =
        'carte_' +
        new Date().toLocaleDateString() +
        '_' +
        new Date().toLocaleTimeString();
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  public onChange(event: any): void {
    var file: File = event.target?.files[0];
    let fileReader: FileReader = new FileReader();
    fileReader.readAsText(file);
    this.fileReaderReady = fileReader;
  }

  createMap() {
    var lines = this.fileReaderReady?.result?.toString().split(/\r?\n/);
    if (lines != undefined) {
      console.log('Chargement de la carte part fichier');
      let mapWidth: number = 0;
      let mapHeight: number = 0;
      this.arrayOfMountain = new Array<Mountain>();
      this.arrayOfTreasures = new Array<Treasur>();
      this.arrayOfAdventurers = new Array<Adventurer>();
      for (const line of lines) {
        var trimLine = line.toString().replace(/\s/g, '').split('-');
        switch (trimLine[0]) {
          case 'C':
            mapWidth = Number(trimLine[1]);
            mapHeight = Number(trimLine[2]);
            break;
          case 'M':
            this.arrayOfMountain.push(
              new Mountain(
                trimLine[0],
                Number(trimLine[1]),
                Number(trimLine[2])
              )
            );
            break;
          case 'T':
            this.arrayOfTreasures.push(
              new Treasur(
                trimLine[0],
                Number(trimLine[1]),
                Number(trimLine[2]),
                Number(trimLine[3])
              )
            );
            break;
          case 'A':
            this.arrayOfAdventurers.push(
              new Adventurer(
                trimLine[0],
                trimLine[1],
                Number(trimLine[2]),
                Number(trimLine[3]),
                trimLine[4],
                trimLine[5],
                Number(trimLine[6])
              )
            );
            break;
          default:
            break;
        }
      }
      this.carte = new Map(
        'C',
        mapWidth,
        mapHeight,
        this.arrayOfMountain,
        this.arrayOfTreasures,
        this.arrayOfAdventurers
      );
    }
  }

  displayMap() {
    this.arrayOfAllCoordinates = new Array<Coordinates>();
    this.arrayOfHeight = new Array<number>();
    this.arrayOfWidth = new Array<number>();
    if (this.carte != undefined) {
      for (let i = 0; i < this.carte.width; i++) {
        this.arrayOfWidth.push(i);
      }

      for (let i = 0; i < this.carte.height; i++) {
        this.arrayOfHeight.push(i);
      }

      let mapCoordinates = this.carte.getMapCoordinates();
      let arrayOfDefaultsCoordinates = new Array<Coordinates>();

      for (let i = 0; i < this.carte.width; i++) {
        for (let j = 0; j < this.carte.height; j++) {
          let tempCoordinate = new DefaultCoordinate('.', i, j);
          arrayOfDefaultsCoordinates.push(tempCoordinate);
        }
      }
      this.arrayOfAllCoordinates =
        arrayOfDefaultsCoordinates.concat(mapCoordinates);
      console.log(this.arrayOfAllCoordinates);
    }
  }
}
