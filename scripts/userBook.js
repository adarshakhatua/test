fetch(`https://book-library-hftd.onrender.com/books?borrowed=true`).then((val)=>val.json()).then((res)=>{displayData(res);console.log(res);}).catch((err)=>{console.log(err)});


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
        let image=document.createElement("img");

        image.src=ele.image_url;
        image.style.height="100px"
        td2.innerText=ele.book_name;
        td3.innerText=ele.author;
        td4.innerText=ele.genre;
        td5.innerText=ele.edition;
        td6.innerText=ele.publisher;
        td7.innerText=ele.cost;
        td1.append(image);
        tr.append(td1,td2,td3,td4,td5,td6,td7);
        tbody.append(tr);
    })
}