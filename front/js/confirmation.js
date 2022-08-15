const id = (new URL(location)).searchParams.get("id");

const orderId = document.getElementById("orderId");
orderId.innerHTML = id;