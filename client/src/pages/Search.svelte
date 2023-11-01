<script>
  import { onMount } from "svelte";
  import { products } from "../stores.js";
  import Product from "../components/Product.svelte";

  let productList = [];
  let categoryList = [];
  let locationList = [];
  let productSearch = "";
  let minPrice = 0;
  let maxPrice = 9999999999;
  let selectedCategories = [];
  let selectedLocations = [];

  onMount(async () => {
    await fetchProducts();
    makeUniqueFilterList();
  });

  async function fetchProducts() {
    const response = await fetch("http://localhost:3000/product");
    productList = await response.json();
    products.set(productList);
  }

  async function searchProduct() {
    await fetchProducts(); // Refetch products

    let searchList = productList.filter((product) => {
      const nameMatch = product.name
        .toLowerCase()
        .includes(productSearch.toLowerCase());
      const priceMatch =
        product.current_bid >= minPrice && product.current_bid <= maxPrice;
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category_name);
      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.includes(product.location);
      return nameMatch && priceMatch && categoryMatch && locationMatch;
    });

    if (searchList.length === 0) {
      alert("Geen producten gevonden met deze filters.");
      searchList = productList;
    }

    productList = searchList;
  }

  function makeUniqueFilterList() {
    categoryList = [
      ...new Set(productList.map((product) => product.category_name)),
    ];
    locationList = [...new Set(productList.map((product) => product.location))];
    selectedCategories = [...categoryList];
    selectedLocations = [...locationList];
  }
</script>

<main>
  <h1>Zoek pagina</h1>
  <div class="search">
    <input
      type="text"
      bind:value={productSearch}
      placeholder="Zoek naar producten..."
    />
    <button on:click={searchProduct}>Zoek</button>
  </div>
  <div class="filters">
    <fieldset>
      <legend style="font-size: 20;"><b>Minimale prijs:</b></legend>
      <input type="number" bind:value={minPrice} placeholder="Min prijs" />
    </fieldset>

    <fieldset>
      <legend style="font-size: 20;"><b>Maximale prijs:</b></legend>
      <input type="number" bind:value={maxPrice} placeholder="Max prijs" />
    </fieldset>

    <fieldset>
      <legend style="font-size: 20;"><b>Categorie:</b></legend>
      {#each categoryList as category (category)}
        <label>
          <input
            type="checkbox"
            bind:group={selectedCategories}
            value={category}
          />
          {category}
        </label><br />
      {/each}
    </fieldset>

    <fieldset>
      <legend style="font-size: 20;"><b>Locatie:</b></legend>
      {#each locationList as location (location)}
        <label>
          <input
            type="checkbox"
            bind:group={selectedLocations}
            value={location}
          />
          {location}
        </label><br />
      {/each}
    </fieldset>
  </div>

  <div class="productSec">
    {#each productList as product (product.id)}
      <Product {product} />
    {/each}
  </div>
</main>

<style>
  .search {
    display: flex;
  }

  .filters {
    position: relative;
    left: 0;
    top: 0;
    bottom: 0;
    width: 250px;
    background-color: #f2f2f2;
    float: left;
    margin-top: 20px;
    margin-right: 20px;
    padding: 20px;
  }

  .filters input[type="number"] {
    width: 100%;
    box-sizing: border-box;
    font-size: 14px;
  }

  .search input[type="text"] {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  .search button {
    outline: 0;
    background: #a95dff;
    width: 300px;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    color: black;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    grid-column: 1 / span 2;
  }

  .search button:hover,
  .search button:active,
  .search button:focus {
    background: #c38eff;
  }

  .productSec {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    margin: 20px;
  }

  @media screen and (max-width: 1032px) {
    .productSec {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  @media screen and (max-width: 672px) {
    .filters {
      position: none;
      float: none;
      width: 85%;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
