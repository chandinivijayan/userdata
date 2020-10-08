import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Observer } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  imageSrc;
  lstImages=[];
  dctFiles={}
  base64TrimmedURL: string;
  base64DefaultURL: string;
  generatedImage: string;
  windowOPen: boolean;

  myForm = new FormGroup({
  //  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl(''),
   certificate: new FormControl(''),

   photo:new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });
  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }
      

  get f(){
    return this.myForm.controls;
  }



selectFile(event,type){
  var files = event.target.files;
  var file = files[0];

  if(file.size>100000){
    Swal.fire("Enter a file file under 100kb");
    return false;
  }

if (files && file) {
    var reader = new FileReader();

    if(type=='file'){
      reader.onload =this.handleFile.bind(this);

    }
    else if(type=='certificate'){
    reader.onload =this.handleCertificate.bind(this);

    }
    else if(type=='photo') {
      reader.onload =this.handlePhoto.bind(this);
    }
    // reader.onload =this.handleFile.bind(this);

    reader.readAsBinaryString(file);
}
}



handleFile(event) {
 var binaryString = event.target.result;
        this.imageSrc= btoa(binaryString);
        this.dctFiles['file']=btoa(binaryString)
}
handlePhoto(event) {
  var binaryString = event.target.result;
         this.imageSrc= btoa(binaryString);
         this.dctFiles['photo']=btoa(binaryString)
 }
 handleCertificate(event) {
  var binaryString = event.target.result;
         this.imageSrc= btoa(binaryString);
         this.dctFiles['certificate']=btoa(binaryString)
 }

dowonload() {

  let byteCharacters = atob(this.imageSrc);

let byteNumbers = new Array(byteCharacters.length);
for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
}

let byteArray = new Uint8Array(byteNumbers);

let blob = new Blob([byteArray], {"type": "image/jpeg"});

if(navigator.msSaveBlob){
    let filename = 'picture';
    navigator.msSaveBlob(blob, filename);
} else {
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.setAttribute('visibility','hidden');
    link.download = 'picture';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
  }

  saveFile() {
    localStorage.setItem("dctFiles",JSON.stringify(this.dctFiles));
    
    this.myForm.reset();
    this.router.navigateByUrl('/upload/view');

  }
  

}
