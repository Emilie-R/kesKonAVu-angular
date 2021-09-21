/** MemberModel
   Modèle pour définir les données du Member */

export class MemberModel {
    pseudo:string;
    email:string;
    creationDate:Date;
    lastConnexionDateTime:Date;

    constructor(member:any){
        this.pseudo = member.pseudo;
        this.email = member.email;
        this.creationDate = member.creationDate;
        this.lastConnexionDateTime = new Date(member.lastConnexionDateTime);
    }
}