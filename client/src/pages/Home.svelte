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
  {#if $token === ""}
    <h1>Welkom op de PartsOnline veiling website! Login om te bieden.</h1>
  {/if}
  {#if $token !== ""}
    <h1>Welkom op de PartsOnline veiling website!</h1>
  {/if}
  <div class="wrapper">
    <div class="productSec">
      {#each itemList as item (item.id)}
        <Item {item} />
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
