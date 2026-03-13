function openPage(id){
  document.querySelectorAll(".page").forEach(p=>p.style.display="none");
  document.getElementById(id).style.display="block";
}

openPage("pdf");

// Firebase Functions (basic)
function uploadPDF(){
  const file = document.getElementById("pdf-file").files[0];
  const category = document.getElementById("pdf-category").value;
  const storageRef = storage.ref(`pdfs/${file.name}`);
  storageRef.put(file).then(()=>storageRef.getDownloadURL().then(url=>{
    db.collection("pdfs").add({name:file.name, url:url, category:category});
    alert("PDF uploaded!");
  }));
}

function uploadVideo(){
  const file = document.getElementById("video-file").files[0];
  const storageRef = storage.ref(`videos/${file.name}`);
  storageRef.put(file).then(()=>storageRef.getDownloadURL().then(url=>{
    db.collection("videos").add({name:file.name, url:url});
    alert("Video uploaded!");
  }));
}

function uploadProduct(){
  const name = document.getElementById("product-name").value;
  const price = document.getElementById("product-price").value;
  const file = document.getElementById("product-file").files[0];
  const storageRef = storage.ref(`products/${file.name}`);
  storageRef.put(file).then(()=>storageRef.getDownloadURL().then(url=>{
    db.collection("products").add({name:name, price:price, url:url});
    alert("Product added!");
  }));
}

// Fetch PDF, Video & Products
db.collection("pdfs").onSnapshot(snapshot=>{
  const list = document.getElementById("pdf-list"); list.innerHTML="";
  snapshot.docs.forEach(doc=>{
    const data = doc.data();
    list.innerHTML+=`<div class="card"><h4>${data.category}</h4><a href="${data.url}" target="_blank">${data.name}</a></div>`;
  });
});

db.collection("videos").onSnapshot(snapshot=>{
  const list = document.getElementById("video-list"); list.innerHTML="";
  snapshot.docs.forEach(doc=>{
    const data = doc.data();
    list.innerHTML+=`<div class="card"><video width="100%" controls src="${data.url}"></video><p>${data.name}</p></div>`;
  });
});

db.collection("products").onSnapshot(snapshot=>{
  const list = document.getElementById("shop-list"); list.innerHTML="";
  snapshot.docs.forEach(doc=>{
    const data = doc.data();
    list.innerHTML+=`<div class="card"><img src="${data.url}" width="100%"><h4>${data.name}</h4><p>${data.price}</p><button onclick="window.open('https://m.me/YOURPAGE')">Buy via Messenger</button></div>`;
  });
});