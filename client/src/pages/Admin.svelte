<script>
  import { onMount } from "svelte";
  import { products, token } from "../stores.js";

  let name;
  let description;
  let startPrice;
  let category_name;
  let location;
  let image;
  let endDateTime;

  let productList = [];

  let productID;

  onMount(async () => {
    const response = await fetch("http://localhost:3000/product");
    products.set(await response.json());
    productList = $products;
  });

  async function addProduct(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${$token}`,
      },
      body: JSON.stringify({
        name,
        description,
        current_bid: startPrice,
        category_name,
        location,
        image,
        end_time: endDateTime,
      }),
    });

    const data = await response.json();
    if (response.status == 201) {
      alert(`${data.msg}`);
    } else if (response.status == 500) {
      alert(`${data.msg}`);
    } else {
      alert(`Product toevoegen mislukt: ${data.msg}`);
    }
  }

  async function updateProduct(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/product/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${$token}`,
      },
      body: JSON.stringify({
        name,
        description,
        category_name,
        location,
        image,
        endDateTime,
      }),
    });
  }

  async function deleteProduct(event) {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/product/${productID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${$token}`,
      },
    });
  }
</script>

<main>
  <form class="admin-form" id="addProduct" on:submit={addProduct}>
    <h2>Voeg product toe</h2>
    <div class="form-group">
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Productnaam"
        bind:value={name}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="category_name"
        name="category_name"
        placeholder="Categorie"
        bind:value={category_name}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Beschrijving"
        bind:value={description}
      />
    </div>
    <div class="form-group">
      <input
        type="number"
        id="startPrice"
        name="startPrice"
        placeholder="Start bod"
        bind:value={startPrice}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="image"
        name="image"
        placeholder="Afbeelding"
        bind:value={image}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Locatie"
        bind:value={location}
      />
    </div>
    <div class="form-group">
      <input
        type="datetime-local"
        id="endDateTime"
        name="endDateTime"
        placeholder="Eind datum"
        bind:value={endDateTime}
      />
    </div>
    <button type="submit">Voeg product toe</button>
  </form>

  <form class="admin-form" id="updateProduct" on:submit={updateProduct}>
    <h2>Update product</h2>
    <div class="form-group">
      <select bind:value={productID}>
        {#each productList as product (product.id)}
          <option value={product.id}>{product.name}</option>
        {/each}
      </select>
    </div>
    <div class="form-group">
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Productnaam"
        bind:value={name}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="category_name"
        name="category_name"
        placeholder="Categorie"
        bind:value={category_name}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Beschrijving"
        bind:value={description}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="image"
        name="image"
        placeholder="Afbeelding"
        bind:value={image}
      />
    </div>
    <div class="form-group">
      <input
        type="text"
        id="location"
        name="location"
        placeholder="Locatie"
        bind:value={location}
      />
    </div>
    <div class="form-group">
      <input
        type="datetime-local"
        id="endDateTime"
        name="endDateTime"
        placeholder="Eind datum"
        bind:value={endDateTime}
      />
    </div>
    <button type="submit">Update product</button>
  </form>

  <form class="admin-form" on:submit={deleteProduct}>
    <h2>Verwijder product</h2>
    <div class="form-group">
      <select bind:value={productID}>
        {#each productList as product (product.id)}
          <option value={product.id}>{product.name}</option>
        {/each}
      </select>
    </div>
    <button type="submit">Verwijder product</button>
  </form>
</main>

<style>
  .admin-form {
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
    position: relative;
    z-index: 1;
    background: #f2f2f2;
    max-width: 500px;
    margin: 50px auto 50px;
    padding: 45px;
    text-align: center;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    width: 100%;
    max-width: 497.6px;
  }

  input,
  select {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 0.5rem;
    background-color: #a95dff;
    color: black;
    border: none;
    border-radius: 0.25rem;
    font-size: 1rem;
    cursor: pointer;
    /* outline: 0;
    background: #a95dff;
    width: 100%;
    border: 0;
    padding: 15px;
    color: black;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer; */
  }

  button:hover {
    background-color: #c38eff;
  }
</style>
