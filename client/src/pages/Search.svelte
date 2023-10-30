<script>
  import { onMount } from "svelte";
  import Item from "../components/Item.svelte";
  import { items, token } from "../stores.js";

  let itemList = [];

  onMount(() => {
    fetchItems();
  });

  async function fetchItems() {
    const response = await fetch("http://localhost:3000/item");
    items.set(await response.json());
    itemList = $items;
  }
</script>

<main>
  <h1>Zoek pagina</h1>
  <div class="search">
    <input
      type="text"
      placeholder="Voer naam product in..."
      class="form-control"
      id="product"
    />
    <input
      type="submit"
      value="Zoeken op product naam"
      class="product-knop"
      id="product-button"
    />
  </div>
  <div class="filter-box">
    <h3>Filters</h3>
    <label for="price-range">Price range:</label>
    <input type="range" id="price-range" name="price-range" min="0" max="100" />
    <label for="category">Category:</label>
    <select id="category" name="category">
      <option value="1">Category 1</option>
      <option value="2">Category 2</option>
      <option value="3">Category 3</option>
    </select>
    <label for="location">Location:</label>
    <select id="location" name="location">
      <option value="Amsterdam">Amsterdam</option>
      <option value="Rotterdam">Rotterdam</option>
      <option value="Utrecht">Utrecht</option>
    </select>
  </div>
  <div class="productSec">
    {#each itemList as item (item.id)}
      <Item {item} />
    {/each}
  </div>
</main>

<style>
  .search {
    display: flex;
  }
  .filter-box {
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
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
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

  .search input[type="submit"] {
    outline: 0;
    background: #ffb775;
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

  .search input[type="submit"]:hover,
  .search input[type="submit"]:active,
  .search input[type="submit"]:focus {
    background: black;
    color: white;
  }

  .productSec {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
    margin: 20px;
  }

  @media screen and (max-width: 1024px) {
    .productSec {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    .productSec {
      grid-template-columns: repeat(1, 1fr);
    }
  }
</style>
