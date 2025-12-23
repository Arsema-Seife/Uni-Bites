/* handling API style data */
    const orders = [
        {
            client: " ",
            phone: " ",
            foods: [" "],
            quantity: 0,
            price: 0,
            status: 0
        },
        {
            client: " ",
            phone: "  ",
            foods: [" "],
            quantity: 0,
            price: 0,
            status: 0
        },
        {
            client: " ",
            phone: " ",
            foods: ["  "],
            quantity: 0, 
            price:  0,
            status:0
        }
    ];

    const totalOrdersEl = document.getElementById("totalOrders");
    const totalRevenueEl = document.getElementById("totalRevenue");
    const ordersTable = document.getElementById("ordersTable");

    totalOrdersEl.textContent = orders.length;

    let totalRevenue = 0;

    orders.forEach((order, index) => {
        totalRevenue += order.price;
     /*creating element */
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.client}</td>
            <td>${order.phone}</td>
            <td>${order.foods.join(", ")}</td>
            <td>${order.quantity}</td>
            <td>${order.price}</td>
            <td>
 <select>
      <option ${order.status === "Ordered" ? "selected" : ""}>Ordered</option>
      <option ${order.status === "Preparing" ? "selected" : ""}>Preparing</option>
      <option ${order.status === "Ready" ? "selected" : ""}>Ready</option>
      <option ${order.status === "Delivered" ? "selected" : ""}>Delivered</option>
 </select>
            </td>  `;

        ordersTable.appendChild(row);
    });

    totalRevenueEl.textContent = totalRevenue + " Birr";

    /* Theme toggle */
// Real-time validation for Full Name
    const toggleBtn = document.getElementById("themeToggle");

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        toggleBtn.textContent = document.body.classList.contains("dark")
            ? "☀ Light"
             : "🌙 Dark";
    });