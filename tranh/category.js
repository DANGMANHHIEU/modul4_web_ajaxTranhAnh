//CATEGORY
function showCategory(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/category/list",
        success(data){
            let context = "";
            context += `<table border="1px">
               <tr>
               <td>ID</td>
               <td>Name Category</td>
               <td>Thao tác</td>
</tr>`
            for (let i = 0; i < data.length; i++) {
                context +=`<tr>
<td>${data[i].id}</td>
<td>${data[i].name}</td>
<td><button onclick="updateCategory(${data[i].id})">Update</button>||<button onclick="deleteCategory(${data[i].id})">Delete</button></td>
</tr>`
            }
            context +=`</table>`
            document.getElementById("display").innerHTML= context;
        }
    })
}

// sửa category
function updateCategory(id){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/painting/"+id,
        success(data2){

        }
    })
}

// xoa category
function deleteCategory(id){
    if(confirm("Bạn có chắc chắn muốn xóa ???")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/category/" + id,
            success() {
                showCategory();
            }
        })
    }
}



function createCategory(){
    let from = "";
    from +=`
    <from id="add-Category">
<table>
         <tr>
            <td>nameCategory:</td>
            <td><input type="text" id="nameCategory" placeholder="nameCategory"></td>
        </tr>
         <tr>
            <td></td>
            <td><input type="submit" value="Add" onclick="addNewCategory()"></td>
        </tr>
</table>
</from>`
    document.getElementById("display").innerHTML= from;
}

function addNewCategory(){
    let nameCategory = $('#nameCategory').val()
    let newCate= {
        name:nameCategory
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type:"POST",
        data:JSON.stringify(newCate),
        url:"http://localhost:8080/category/create",
        //xử lý khi thành công
        success(){
            showCategory();
        }
    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}


function aa(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/category/list",
        success(data1){
            let bvc = ``
            bvc += `<select id="search-category">`
            for (let i = 0; i <data1.length ; i++) {
                bvc += `
                    <option value="${data1[i].id}" >${data1[i].name}</option>`

            }
            bvc+=`</select>`
            document.getElementById("category1").innerHTML = bvc;
        }
    })


}
aa()


// tìm kiếm tranh theo danh mục
function searchByCategory(){
    let categoryId = $('#search-category').val();
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/painting/searchCategory/"+categoryId,
        success(dataCategory){
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
            for (let i = 0; i < dataCategory.length; i++) {
                context += `<tr>
        <td>${dataCategory[i].id}</td>
        <td>${dataCategory[i].namePainting}</td>
        <td>${dataCategory[i].height}</td>
        <td>${dataCategory[i].width}</td>
        <td>${dataCategory[i].material}</td>
        <td>${dataCategory[i].description}</td>
        <td>${dataCategory[i].price}</td>
        <td>${dataCategory[i].categoryList[0].name}</td>
        <td><button onclick="view(${dataCategory[i].id})">View</button>||<button onclick="update(${dataCategory[i].id})">Update</button>||<button onclick="deletePainting(${dataCategory[i].id})">Delete</button> </td>
         </tr>`
            }
            ;
            context += `</table>`
            document.getElementById("display").innerHTML = context;
        }
    })
}