function showList(){
    $.ajax({
        url:"http://localhost:8080/painting/list",
        type:"GET",
        success(data) {
            console.log(data);
            let context = ``;
            context += `<table border="1px">
    <tr> 
    <td>ID</td>
    <td>namePainting</td>
    <td>height</td>
    <td>width</td>
    <td>material</td>
    <td>description</td>
    <td>price</td>
    <td>category</td>
    <td>Thao tác</td>
    </tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].namePainting}</td>
        <td>${data[i].height}</td>
        <td>${data[i].width}</td>
        <td>${data[i].material}</td>
        <td>${data[i].description}</td>
        <td>${data[i].price}</td>
        <td>${data[i].categoryList[0].name}</td>
        <td><button onclick="view(${data[i].id})">View</button>||<button onclick="update(${data[i].id})">Update</button>||<button onclick="deletePainting(${data[i].id})">Delete</button> </td>
         </tr>`
            }
            ;
            context += `</table>`
            document.getElementById("display").innerHTML = context;
        }
    })
}

// thêm mới
function createShow(){
    let form = ``;
    form += `<form id="add-Painting">
    <table>
       <tr>
            <td>namePainting:</td>
            <td><input type="text" id="namePainting" placeholder="namePainting"></td>
        </tr>
        <tr>
            <td>height:</td>
            <td><input type="text" id="height" placeholder="height"></td>
        </tr>
        <tr>
            <td>width:</td>
            <td><input type="text" id="width" placeholder="width"></td>
        </tr>
        <tr>
            <td>material:</td>
            <td><input type="text" id="material" placeholder="material"></td>
        </tr>
         <tr>
            <td>description:</td>
            <td><input type="text" id="description" placeholder="description"></td>
        </tr>
         <tr>
            <td>price:</td>
            <td><input type="text" id="price" placeholder="price"></td>
        </tr>
        <tr>
        <td>category</td>
        <td><select id="category"></select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Add" onclick="addNewPainting()"></td>
        </tr>
    </table>
</form>`

    $.ajax({
        url:"http://localhost:8080/category/list",
     type: "GET",
        success(data) {
            let a = ``
            for (let i = 0; i < data.length; i++) {
                a += `<option value="${data[i].id},${data[i].name}"  >${data[i].name}</option>`
            }
            document.getElementById("category").innerHTML= a;
        }
    })
    document.getElementById("display").innerHTML=form;
}

// lưu lại
function addNewPainting(){
let namePainting = $('#namePainting').val();
let height = $('#height').val();
let width = $('#width').val();
let material = $('#material').val();
let description = $('#description').val();
let price = $('#price').val();
let category = $('#category').val().split(",");
let id = category[0];
let name = category[1];
let newPainting = {
    namePainting:namePainting,
    height:height,
    width:width,
    material:material,
    description:description,
    price:price,
    categoryList:[{id,name}]
}

$.ajax({
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    type:"POST",
    data:JSON.stringify(newPainting),
    url:"http://localhost:8080/painting/create",
    //xử lý khi thành công
    success(){
        showList();
    }
});
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();

}

// xóa
function deletePainting(id){
    if(confirm("Bạn có chắc chắn muốn xóa ???")){
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/painting/"+id,
        success(){
            showList();
        }
    })
    }
}

//view
function view(id){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/painting/"+id,
        success(data){
            document.getElementById("display").innerHTML=`<table border="1px">
<tr>
<td>ID</td>
<td>namePainting</td>
<td>height</td>
<td>width</td>
<td>material</td>
<td>description</td>
<td>price</td>
<td>category</td>
</tr>
<tr>
<td>${data.id}</td>
<td>${data.namePainting}</td>
<td>${data.height}</td>
<td>${data.width}</td>
<td>${data.material}</td>
<td>${data.description}</td>
<td>${data.price}</td>
<td>${data.categoryList[0].name}</td>
</tr>
</table>
`
        }
    })
}

//update
function update(id){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/painting/"+id,
        success(data){
            let form = ``;
            form += `<form id="update-Painting">
    <table>
       <tr>
            <td>namePainting:</td>
            <td><input type="text" id="namePainting" value="${data.namePainting}"></td>
        </tr>
        <tr>
            <td>height:</td>
            <td><input type="text" id="height" value="${data.height}"></td>
        </tr>
        <tr>
            <td>width:</td>
            <td><input type="text" id="width" value="${data.width}"></td>
        </tr>
        <tr>
            <td>material:</td>
            <td><input type="text" id="material" value="${data.material}"></td>
        </tr>
         <tr>
            <td>description:</td>
            <td><input type="text" id="description" value="${data.description}"></td>
        </tr>
         <tr>
            <td>price:</td>
            <td><input type="text" id="price" value="${data.price}"></td>
        </tr>
        <tr>
        <td>category</td>
        <td><select id="category"></select></td>
        </tr>
        <tr>
            <td></td>
            <td><input type="submit" value="Update" onclick="updatePainting(${id})"></td>
        </tr>
    </table>
</form>`
            $.ajax({
                type:"GET",
                url:"http://localhost:8080/category/list",
                success(dataCategory){
                    console.log(dataCategory)
                    let option="";
                    for(let i=0;i<dataCategory.length;i++){
                        let selected = "";
                        if(dataCategory[i].id == data.categoryList[0].id){
                            selected = "selected";
                        }
                        option += `<option  value="${dataCategory[i].id},${dataCategory[i].name}" ${selected}>${dataCategory[i].name}</option>`
                    }
                    document.getElementById("category").innerHTML=option;
                }
            })
            document.getElementById("display").innerHTML=form;
        }
    })
}

function updatePainting(a){
    let namePainting = $('#namePainting').val();
    let height = $('#height').val();
    let width = $('#width').val();
    let material = $('#material').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let category = $('#category').val().split(",");
    let id = category[0];
    let name = category[1];
    let newPainting = {
        namePainting:namePainting,
        height:height,
        width:width,
        material:material,
        description:description,
        price:price,
        categoryList:[{id,name}]
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"PUT",
        data:JSON.stringify(newPainting),
        url:"http://localhost:8080/painting/"+a,
    success(){
            showList();
    }
    });
    event.preventDefault();
}
//tìm kiếm theo tên
function searchByName(){
    let namePain= document.getElementById("search-name").value;
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/painting/search?name="+namePain,
        success(data){
            let context = ``;
            context += `<table border="1px">
    <tr> 
    <td>ID</td>
    <td>namePainting</td>
    <td>height</td>
    <td>width</td>
    <td>material</td>
    <td>description</td>
    <td>price</td>
    <td>category</td>
    <td>Thao tác</td>
    </tr>`
            for (let i = 0; i < data.length; i++) {
                context += `<tr>
        <td>${data[i].id}</td>
        <td>${data[i].namePainting}</td>
        <td>${data[i].height}</td>
        <td>${data[i].width}</td>
        <td>${data[i].material}</td>
        <td>${data[i].description}</td>
        <td>${data[i].price}</td>
        <td>${data[i].categoryList[0].name}</td>
        <td><button onclick="view(${data[i].id})">View</button>||<button onclick="update(${data[i].id})">Update</button>||<button onclick="deletePainting(${data[i].id})">Delete</button> </td>
         </tr>`
            }
            ;
            context += `</table>`
            document.getElementById("display").innerHTML = context;
        }
    })
}

