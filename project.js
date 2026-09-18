function buyBook(bookName, price) {

    let buyerName = prompt("Enter Buyer Name:");

    if (buyerName == null || buyerName == "") {
        return;
    }

    let phone = prompt("Enter Phone Number:");

    if (phone == null || phone == "") {
        return;
    }

    let date = new Date().toLocaleDateString();

    let row = `
        <tr>
            <td>${buyerName}</td>
            <td>${phone}</td>
            <td>${bookName}</td>
            <td>Rs.${price}</td>
            <td>${date}</td>
        </tr>
    `;

    document.getElementById("buyerDetails").innerHTML += row;


    fetch("http://localhost:3000/buy", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            name: buyerName,
            phone: phone,
            book: bookName,
            price: price
        })

    })
    .then(res => res.text())

    .then(data => {

        alert("Book Bought Successfully!");

    });

}


function deleteBook(button) {

    button.parentElement.remove();

}


function sellBook() {

    let title = document.getElementById("title").value;

    let author = document.getElementById("author").value;

    let price = document.getElementById("price").value;


    if (title == "" || author == "" || price == "") {

        alert("Please fill all details");

        return;

    }


    let book = document.createElement("div");

    book.className = "book";


    book.innerHTML = `

        <h2>📖 ${title}</h2>

        <p>By ${author}</p>

        <p>Rs.${price}</p>

        <button onclick="buyBook('${title}', ${price})">
            Buy
        </button>

        <button onclick="deleteBook(this)">
            Delete
        </button>

    `;


    document.getElementById("books").appendChild(book);


    document.getElementById("title").value = "";

    document.getElementById("author").value = "";

    document.getElementById("price").value = "";

}