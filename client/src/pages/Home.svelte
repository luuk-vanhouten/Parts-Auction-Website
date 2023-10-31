<script>
  import { onMount } from "svelte";
  import Product from "../components/Product.svelte";
  import { products, token } from "../stores.js";

  let productList = [];

  onMount(() => {
    fetchProducts();
  });

  async function fetchProducts() {
    const response = await fetch("http://localhost:3000/product");
    products.set(await response.json());
    productList = $products;
  }
</script>

<main>
  {#if $token === ""}
    <h1>Welkom op de PartsOnline veiling website! Login om te bieden.</h1>
  {/if}
  {#if $token !== ""}
    <h1>Welkom op de PartsOnline veiling website!</h1>
  {/if}
  <div class="wrapper">
    <div class="productSec">
      {#each productList as product (product.id)}
        <Product {product} />
      {/each}
    </div>
  </div>
</main>

<style>
  .productSec {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin: 20px;
  }

  @media screen and (max-width: 1091px) {
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
