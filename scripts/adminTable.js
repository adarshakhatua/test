let form=document.getElementById("form");

form.addEventListener("submit",submitData);


function submitData(event){
    event.preventDefault();

    let bookData={
        image_url: form.cover.value,
        book_name: form.bookname.value,
        author: form.author.value,
        genre: form.genre.value,
        edition: form.edition.value,
        publisher: form.publisher.value,
        cost: form.cost.value,
        borrowed: false,
    }
    fetch(" http://localhost:3000/books",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    }).then((val)=>val.json()).then((res)=>{console.log(res);fetchData()}).catch((err)=>{console.log(err)});
}

function fetchData(){
    fetch("http://localhost:3000/books").then((val)=>val.json()).then((res)=>{displayData(res);console.log(res);}).catch((err)=>{console.log(err)});
}
fetchData();

function displayData(data){
    let tbody=document.getElementById("tbody");
    tbody.innerHTML=null;
   
    data.forEach((ele,index)=>{
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        let td5=document.createElement("td");
        let td6=document.createElement("td");
        let td7=document.createElement("td");
        let td8=document.createElement("td");
        let td9=document.createElement("td");
        let image=document.createElement("img");

        image.src=ele.image_url;
        image.style.height="100px"
        td2.innerText=ele.book_name;
        td3.innerText=ele.author;
        td4.innerText=ele.genre;
        td5.innerText=ele.edition;
        td6.innerText=ele.publisher;
        td7.innerText=ele.cost;
        td8.innerText="Edit";
        td9.innerText="Delete";

        td8.style.cursor="pointer";
        td9.style.cursor="pointer";
        td8.addEventListener("click",()=>{editData(ele.id)})
        td9.addEventListener("click",()=>{deleteData(ele.id)})
        td1.append(image);
        tr.append(td1,td2,td3,td4,td5,td6,td7,td8,td9);
        tbody.append(tr);
    })
}


function deleteData(index){
    fetch(`http://localhost:3000/books/${index}`,{
        method: 'DELETE',
    }).then((val)=>val.json()).then((res)=>{console.log(res);fetchData()}).catch((err)=>{console.log(err)});
}

function editData(index){
    fetch(`http://localhost:3000/books/${index}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    }).then((val)=>val.json()).then((res)=>{console.log(res);fetchData()}).catch((err)=>{console.log(err)});
}