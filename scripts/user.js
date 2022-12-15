fetch("http://localhost:3000/books").then((val)=>val.json()).then((res)=>{console.log(res);displayData(res)}).catch((err)=>{console.log(err)});

function displayData(data){
   let container= document.getElementById("container");
   container.innerHTML=null;
    data.forEach((ele,index)=>{
        let card=document.createElement("div");
        card.id="card"
        let img=document.createElement("img");
        let name=document.createElement("h3");
        let author=document.createElement("p");
        let edition=document.createElement("p");
        let genre=document.createElement("p");
        let publiser=document.createElement("p");
        let cost=document.createElement("p");
        let btn=document.createElement("button");

        img.src=ele.image_url;
        name.innerText=ele.book_name;
        author.innerText="Author: "+ele.author;
        edition.innerHTML="Edition: "+ele.edition;
        genre.textContent="Genre: "+ele.genre;
        publiser.innerText="publisher: "+ele.publisher;
        cost.innerText="Cos: "+ele.cost;
        btn.innerText="Borrow";
        btn.addEventListener("click",()=>{borrowBook(ele.id)});

        card.append(img,name,author,edition,genre,publiser,cost,btn);
        container.append(card)
    })
}

document.getElementById("filter").addEventListener("change",()=>{
    let data=document.getElementById("filter").value;
    if(data){
        fetch(`http://localhost:3000/books?genre=${data}`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    else{
        fetch(`http://localhost:3000/books`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)}); 
    }  
})

document.getElementById("sort").addEventListener("change",()=>{
    let data=document.getElementById("sort").value;
    if(data){
        fetch(`http://localhost:3000/books?_sort=cost&_order=${data}`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    else{
        fetch(`http://localhost:3000/books`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    
})