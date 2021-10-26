//open the console from inspect element and then search for the canvas element id 
//and replace the website's canvas element id below with the real id and paste the
//remaining code in the console

var canvas = document.getElementById( '<WEBSITEs CANVAS ELEMENT ID>' );

function downloadCanvas(){  
    // get canvas data  
    var image = canvas.toDataURL();  
  
    // create temporary link  
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'image.png'; // set the name of the download file 
    tmpLink.href = image;  
  
    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
}
