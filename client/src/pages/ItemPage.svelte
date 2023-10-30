<script>
  import { onMount } from "svelte";
  import page from "page";
  let item;

  onMount(() => {
    fetchItem();
  });

  async function fetchItem() {
    try {
      const res = await fetch(`http://localhost:3000/item/${params.id}`);
      if (!res.ok) {
        throw new Error("Item not found");
      }
      item = await res.json();
    } catch (error) {
      console.error(error);
      page.redirect("/");
    }
  }

  export let params;
</script>

<main>
  {#if item !== undefined}
    <div class="item">
      <h1 class="item__title">{item.name}</h1>
      <img class="item__image" src={item.image} alt={item.name} />
      <p class="item__price">Huidig bod: €{item.current_bid}</p>
      <button class="item__button">Buy now</button>
      <p class="item__description">{item.description}</p>
    </div>
    <div class="bids">
      <h2>Biedingen</h2>
      <ul>
        {#each item.bids.reverse() as bid}
          <li>€{bid}</li>
        {/each}
      </ul>
    </div>
  {:else}
    <p>Aan het laden...</p>
  {/if}
</main>

<style>
  main {
  }
  .item {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr; */
    grid-template-areas:
      "titel titel"
      "afbeelding prijs"
      "afbeelding bestel-knop"
      "beschrijving beschrijving";
    grid-gap: 1rem;
    margin: 1rem 0 1rem 0;
    background-color: #f2f2f2;
  }

  .bids {
    margin: 1rem 0 1rem 0;
    background-color: #f2f2f2;
  }

  .item__title {
    grid-area: titel;
    margin: 5px;
  }

  .item__image {
    grid-area: afbeelding;
    max-width: 350px;
    margin-left: 10px;
  }

  .item__price {
    grid-area: prijs;
    margin: 0;
    font-size: x-large;
  }

  .item__button {
    grid-area: bestel-knop;
    max-width: 300px;
    max-height: 100px;
    outline: 0;
    background: #3cff00;
    border: 0;
    padding: 15px;
    color: black;
    font-size: 40px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }

  .item__button:hover,
  .item__button:active,
  .item__button:focus {
    background: #3f8d00;
    color: white;
  }

  .item__description {
    grid-area: beschrijving;
    margin-left: 5px;
    max-width: 60%;
  }

  @media screen and (max-width: 800px) {
    .item {
      grid-template-areas:
        "titel titel"
        "afbeelding afbeelding"
        "prijs bestel-knop"
        "beschrijving beschrijving";
    }
  }

  @media screen and (max-width: 1000px) {
    .item__description {
      max-width: 100%;
      margin-right: 5px;
    }
  }
</style>
