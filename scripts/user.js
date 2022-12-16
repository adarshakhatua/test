fetch("https://book-library-hftd.onrender.com/books").then((val)=>val.json()).then((res)=>{console.log(res);displayData(res)}).catch((err)=>{console.log(err)});

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
        btn.innerText=ele.borrowed?"Borrowed":"Borrow";
        btn.style.backgroundColor=ele.borrowed?"red":"green";
        btn.style.color="white";
        btn.disabled=ele.borrowed?true:false;
        btn.addEventListener("click",()=>{createModal(ele);});

        card.append(img,name,author,edition,genre,publiser,cost,btn);
        container.append(card)
    })
}

document.getElementById("filter").addEventListener("change",()=>{
    let data=document.getElementById("filter").value;
    if(data){
        fetch(`https://book-library-hftd.onrender.com/books?genre=${data}`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    else{
        fetch(`https://book-library-hftd.onrender.com/books`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)}); 
    }  
})

document.getElementById("sort").addEventListener("change",()=>{
    let data=document.getElementById("sort").value;
    if(data){
        fetch(`https://book-library-hftd.onrender.com/books?_sort=cost&_order=${data}`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    else{
        fetch(`https://book-library-hftd.onrender.com/books`).then((val)=>val.json()).then((res)=>{displayData(res)}).catch((err)=>{console.log(err)});
    }
    
})

function borrowBook(ele){
   //console.log(index)
   fetch(`https://book-library-hftd.onrender.com/books/${ele.id}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({...ele,borrowed:true})
    }).then((val)=>val.json()).then((res)=>{console.log(res);alert("book successfully borrowed!");fetch("https://book-library-hftd.onrender.com/books").then((val)=>val.json()).then((res)=>{console.log(res);displayData(res)}).catch((err)=>{console.log(err)});}).catch((err)=>{console.log(err)});
}

function createModal(ele){
    let container= document.getElementById("container");

        let card=document.createElement("div");
        card.id="card1"
        let img=document.createElement("img");
        let name=document.createElement("h3");
        let author=document.createElement("p");
        let edition=document.createElement("p");
        let genre=document.createElement("p");
        let publiser=document.createElement("p");
        let cost=document.createElement("p");
        let btn1=document.createElement("button");
        let btn2=document.createElement("button");

        img.src=ele.image_url;
        name.innerText=ele.book_name;
        author.innerText="Author: "+ele.author;
        edition.innerHTML="Edition: "+ele.edition;
        genre.textContent="Genre: "+ele.genre;
        publiser.innerText="publisher: "+ele.publisher;
        cost.innerText="Cos: "+ele.cost;
        btn1.innerText="Close";
        btn2.innerText="Confirm";
        btn1.addEventListener("click",()=>{card.style.display='none';document.querySelector("body").style.backgroundColor="white";});
        btn2.addEventListener("click",()=>{borrowBook(ele)});

        card.append(img,name,author,edition,genre,publiser,cost,btn1,btn2);
        container.append(card);
        document.querySelector("body").style.backgroundColor="gray";
    
}