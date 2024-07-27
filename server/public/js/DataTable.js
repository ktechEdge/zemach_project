async function FetchJSN(){
    try{
        // let res = await fetch('/table_tst');
        let res = await fetch('https://jsonplaceholder.typicode.com/posts/');
        if (!res.ok) throw new Error('Network response was not ok.');

        let data = await res.json();
        CreateTable(data);
    }
    catch(error){ document.getElementById('error').innerHTML = error.message; }
}


function CreateTable(data){
    let Tbody = document.getElementById("TBody");
    Tbody.innerHTML = '';
    data.forEach ( elem => {
        let row = document.createElement("tr");
        row.innerHTML =
  ` <td>${elem.id}</td>
    <td>${elem.title}</td>
    <td>${elem.body}</td> `;
        Tbody.appendChild(row);
    });
}
FetchJSN();