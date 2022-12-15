let form=document.getElementById("form");
let form1=document.getElementById("form1");

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
        let td10=document.createElement("td");
        let image=document.createElement("img");

        image.src=ele.image_url;
        image.style.height="100px"
        td2.innerText=ele.book_name;
        td3.innerText=ele.author;
        td4.innerText=ele.genre;
        td5.innerText=ele.edition;
        td6.innerText=ele.publisher;
        td7.innerText=ele.borrowed;
        td8.innerText=ele.cost;
        td9.innerText="Edit";
        td10.innerText="Delete";

        td8.style.cursor="pointer";
        td9.style.cursor="pointer";
        td9.addEventListener("click",()=>{createForm(ele.id)})
        td10.addEventListener("click",()=>{deleteData(ele.id)})
        td1.append(image);
        tr.append(td1,td2,td3,td4,td5,td6,td7,td8,td9,td10);
        tbody.append(tr);
    })
}


function deleteData(index){
    fetch(`http://localhost:3000/books/${index}`,{
        method: 'DELETE',
    }).then((val)=>val.json()).then((res)=>{console.log(res);fetchData()}).catch((err)=>{console.log(err)});
}

function editData(index){
   let data={
        image_url: document.getElementById("cover1").value,
        book_name: document.getElementById("bookname1").value,
        author: document.getElementById("author1").value,
        genre: document.getElementById("genre1").value,
        edition: document.getElementById("edition1").value,
        publisher: document.getElementById("publiser1").value,
        cost: document.getElementById("cost1").value,
        borrowed: false,
   }
   console.log(data);
    let bookData=
    fetch(`http://localhost:3000/books/${index}`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((val)=>val.json()).then((res)=>{console.log(res);fetchData()}).catch((err)=>{console.log(err)});
}

function createForm(index){
    document.querySelector("body").style.backgroundColor="gray";
    let div=document.createElement("div");
    let input1=document.createElement("input");
    let input2=document.createElement("input");
    let input3=document.createElement("input");
    let input4=document.createElement("input");
    let input5=document.createElement("input");
    let select1=document.createElement("select");
    let select2=document.createElement("select");
    let option1=document.createElement("option");
    let option2=document.createElement("option");
    let option3=document.createElement("option");
    let option4=document.createElement("option");
    let option5=document.createElement("option");
    let option6=document.createElement("option");
    let option7=document.createElement("option");
    let option8=document.createElement("option");
    let option9=document.createElement("option");
    let option10=document.createElement("option");
    let button1=document.createElement("button");
    let button2=document.createElement("button");

    input1.placeholder="enter book cover image url";
    input1.id="cover1";
    input2.placeholder="enter the book name";
    input2.id="bookname1";
    input3.placeholder="enter the author name";
    input3.id="author1";
    input4.placeholder="enter publiser name";
    input4.id="publiser1";
    input5.placeholder="enter cost here";
    input5.id='cost1';
    div.id="form1"
    select1.id='genre1';
    select2.id="edition1";

    option1.textContent="select the genre";
    option2.textContent="Science";
    option2.value="Science";
    option3.textContent="Fiction";
    option3.value="Fiction";
    option4.textContent="History";
    option4.value="History";
    option5.textContent="Tech";
    option5.value="Tech";
    option6.textContent="Business";
    option6.value="Business";
    option7.textContent="choose the edition";
    option8.textContent="2020";
    option8.value="2020";
    option9.textContent="2021";
    option9.value="2021";
    option10.textContent="2022";
    option10.value="2022";
    button1.textContent="Edit";
    button1.style.width="100px"
    button2.style.width="100px"
    button2.textContent="close"


    button1.addEventListener("click",()=>{editData(index)});
    button2.addEventListener("click",()=>{div.style.display="none";document.querySelector("body").style.backgroundColor="white";})

    select1.append(option1,option2,option3,option4,option5,option6);
    select2.append(option7,option8,option9,option10);
    div.append(input1,input2,input3,select1,select2,input4,input5,button1,button2);
    document.getElementById("container").append(div)

}