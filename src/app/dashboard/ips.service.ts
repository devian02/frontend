import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateIntellectualProperty, IntellectualProperty } from '../../models/ip.model';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private http = inject(HttpClient);

  constructor() { }

  // Find all public IPs to display on the dashboard
  findAllPublicIps() {
    return this.http.get<IntellectualProperty[]>('http://localhost:3000/ips');
  }

  // Upload an IP to the backend to then generate the proof of ownership
  uploadIP(createIP: CreateIntellectualProperty) {

    const formData = new FormData();
    formData.append('name', createIP.name);
    formData.append('description', createIP.description);
    formData.append('price', createIP.price.toString());
    formData.append('file', createIP.file);

    return this.http.post<{token: string}>('http://localhost:3000/ips', formData).pipe();

  }
}
