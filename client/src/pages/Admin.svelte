<script>
  let name;
  let category;
  let image;
  let description;
  let startPrice;
  let endDate;
  let endTime;
  let endDateString;

  async function addProduct() {
    const response = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${$token}`,
      },
      body: JSON.stringify({
        name,
        category,
        image,
        description,
        startPrice,
        endDateString,
      }),
    });
  }

  function deleteProduct(event) {
    event.preventDefault();
    // TODO: Implement delete product logic
  }
</script>

<main>
  <h1>ADMIN USE ONLY!</h1>

  <form class="admin-form" id="addProduct" on:submit={addProduct}>
    <h2>Voeg product toe</h2>
    <div class="form-group">
      <label for="name">Productnaam</label>
      <input type="text" id="name" placeholder="Productnaam" />
    </div>
    <div class="form-group">
      <label for="description">Beschrijving</label>
      <input type="text" id="description" placeholder="Beschrijving" />
    </div>
    <div class="form-group">
      <label for="price">Prijs</label>
      <input type="text" id="price" placeholder="Prijs" />
    </div>
    <div class="form-group">
      <label for="image">Afbeelding</label>
      <input type="text" id="image" placeholder="Afbeelding" />
    </div>
    <button type="submit">Voeg product toe</button>
  </form>

  <form class="admin-form" id="updateProduct" on:submit={jeoejeo}>
    <h2>Update product</h2>
    <div class="form-group">
      <label for="product_id">Product ID</label>
      <input type="text" id="product_id" placeholder="Product ID" />
    </div>
    <div class="form-group">
      <label for="name">Productnaam</label>
      <input type="text" id="name" placeholder="Productnaam" />
    </div>
    <div class="form-group">
      <label for="description">Beschrijving</label>
      <input type="text" id="description" placeholder="Beschrijving" />
    </div>
    <div class="form-group">
      <label for="price">Prijs</label>
      <input type="text" id="price" placeholder="Prijs" />
    </div>
    <div class="form-group">
      <label for="image">Afbeelding</label>
      <input type="text" id="image" placeholder="Afbeelding" />
    </div>
    <button type="submit">Update product</button>
  </form>

  <form class="admin-form" on:submit={deleteProduct}>
    <h2>Verwijder product</h2>
    <div class="form-group">
      <label for="product_id">Product ID</label>
      <input type="text" id="product_id" placeholder="Product ID" />
    </div>
    <button type="submit">Verwijder product</button>
  </form>
</main>

<style>
  .admin-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 30rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    width: 100%;
  }

  button {
    padding: 0.5rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #0069d9;
  }
</style>
