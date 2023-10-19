<script>
  function jeoejeo(event) {
    event.preventDefault();
    console.log("jeoejeo");
  }

  function updateCustomer(event) {
    event.preventDefault();
    // TODO: Implement update customer logic
  }

  function deleteProduct(event) {
    event.preventDefault();
    // TODO: Implement delete product logic
  }

  function deleteCustomer(event) {
    event.preventDefault();
    // TODO: Implement delete customer logic
  }
</script>

<main>
  <h1>ADMIN USE ONLY!</h1>

  <form class="admin-form" id="addProduct" on:submit={jeoejeo}>
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

  <form class="admin-form" on:submit={updateCustomer}>
    <h2>Update customer</h2>
    <div class="form-group">
      <label for="customer_id">Customer ID</label>
      <input type="text" id="customer_id" placeholder="Customer ID" />
    </div>
    <div class="form-group">
      <label for="first_name">Voornaam</label>
      <input type="text" id="first_name" placeholder="Voornaam" />
    </div>
    <div class="form-group">
      <label for="last_name">Achternaam</label>
      <input type="text" id="last_name" placeholder="Achternaam" />
    </div>
    <div class="form-group">
      <label for="email">E-mailadres</label>
      <input type="text" id="email" placeholder="E-mailadres" />
    </div>
    <div class="form-group">
      <label for="password">Wachtwoord</label>
      <input type="text" id="password" placeholder="Wachtwoord" />
    </div>
    <button type="submit">Update customer</button>
  </form>

  <form class="admin-form" on:submit={deleteProduct}>
    <h2>Verwijder product</h2>
    <div class="form-group">
      <label for="product_id">Product ID</label>
      <input type="text" id="product_id" placeholder="Product ID" />
    </div>
    <button type="submit">Verwijder product</button>
  </form>

  <form class="admin-form" on:submit={deleteCustomer}>
    <h2>Verwijder customer</h2>
    <div class="form-group">
      <label for="customer_id">Customer ID</label>
      <input type="text" id="customer_id" placeholder="Customer ID" />
    </div>
    <button type="submit">Verwijder customer</button>
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
