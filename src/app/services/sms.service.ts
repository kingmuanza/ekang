import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SmsService {
  constructor(private http: HttpClient) {}

  sendSms(phone, username) {
    let pass = "web29746";
    let msg = `${username} Bienvenue sur la plateforme Ekangossu. votre numéro de téléphone a bien été enregistré`;
    let url = `https://api.1s2u.io/bulksms?username=${name}&password=${pass}&mt=1Type&fl=0&sid=${sender}&mno=${phone}&msg=${msg}`;
    return this.http.get(url);
  }
}
