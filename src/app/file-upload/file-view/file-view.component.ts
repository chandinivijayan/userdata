import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {

  constructor() { }
  dctFilesData={};
  lstFiles=[]

  ngOnInit(): void {
    this.dctFilesData=JSON.parse(localStorage.getItem("dctFiles"));
    this.lstFiles=Object.keys(this.lstFiles)
  }
  dowonload(content,type) {


    let byteCharacters = atob(content);
  
  let byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  
  let byteArray = new Uint8Array(byteNumbers);
  let blob;
  if(type=='photo'){
    blob = new Blob([byteArray], {"type": "image/jpeg"});

  }
  else{
    blob = new Blob([byteArray], {"type": "application/pdf"});

  }
  
  if(navigator.msSaveBlob){
      let filename = 'document';
      navigator.msSaveBlob(blob, filename);
  } else {
      let link = document.createElement("a");
  
      link.href = URL.createObjectURL(blob);
  
      link.setAttribute('visibility','hidden');
      link.download = 'document';
  
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }
    }

}
