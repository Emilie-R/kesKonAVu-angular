import { Status } from "./followup.model";

export class EpisodeNode {
    id:number;
    idEpisode: number;
    title: string;
    season: number;
    type: string;
    number: number;
    status: Status;
    children?: EpisodeNode[];
 

  constructor(type:string, object:any){
    if (type == "saison") {
      /* Pour une saison object = numéro de la saison */
      this.id = null;
      this.idEpisode = null;
      this.title = "Saison " + object;
      this.season = object;
      this.type ="saison"
      this.number = object;
      this.status = Status.avoir;
      this.children = [];
    } else {
      /*Pour un épisode object = episodeFollowup */
      this.id = object.idFollowUp;
      this.idEpisode = object.episode.idEpisode;
      this.title = object.episode.title;
      this.status = object.episodeStatusEnum ? object.episodeStatusEnum : Status.avoir;
      this.number = object.episode.number;
      this.type = "episode";
      this.season = object.episode.seasonNumber;
      this.children = [];
    }
  }
}