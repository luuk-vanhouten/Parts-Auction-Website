<script>
  import { onMount } from "svelte";
  import page from "page";
  export let params;

  let product = null;
  let endTime = null;
  let timeLeft = null;

  onMount(() => {
    fetchProduct();
    const intervalId = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(intervalId);
  });

  async function fetchProduct() {
    try {
      const res = await fetch(`http://localhost:3000/product/${params.id}`);
      if (!res.ok) {
        throw new Error("Product not found");
      }
      product = await res.json();
      endTime = new Date(product.end_time);
    } catch (error) {
      console.error(error);
      page.redirect("/");
    }
  }

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const distance = endTime - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeLeft = { days, hours, minutes, seconds };
  }
</script>

<main>
  {#if product}
    <div class="product">
      <h1 class="product__title">{product.name}</h1>
      <img class="product__image" src={product.image} alt={product.name} />
      <p class="product__price">Huidig bod: €{product.current_bid}</p>
      <button class="product__button">Buy now</button>
      <p class="product__description">{product.description}</p>
      <p class="product__timer">
        Veiling eindigt over: {#if timeLeft}
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        {/if}
      </p>
    </div>
    <div class="bids">
      <h2>Biedingen</h2>
      <ul>
        {#each product.bids.reverse() as bid}
          <li>{bid.user}: €{bid.amount}</li>
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
  .product {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr; */
    grid-template-areas:
      "titel titel"
      "afbeelding prijs"
      "afbeelding bestel-knop"
      "beschrijving timer";
    grid-gap: 1rem;
    margin: 1rem 0 1rem 0;
    background-color: #f2f2f2;
  }

  .bids {
    margin: 1rem 0 1rem 0;
    background-color: #f2f2f2;
  }

  .product__title {
    grid-area: titel;
    margin: 5px;
  }

  .product__image {
    grid-area: afbeelding;
    max-width: 350px;
    margin-left: 10px;
  }

  .product__price {
    grid-area: prijs;
    margin: 0;
    font-size: x-large;
  }

  .product__button {
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

  .product__button:hover,
  .product__button:active,
  .product__button:focus {
    background: #3f8d00;
    color: white;
  }

  .product__description {
    grid-area: beschrijving;
    margin-left: 5px;
  }
  .product__timer {
    grid-area: timer;
    margin-left: 5px;
  }

  @media screen and (max-width: 800px) {
    .product {
      grid-template-areas:
        "titel titel"
        "afbeelding afbeelding"
        "prijs bestel-knop"
        "beschrijving beschrijving";
    }
  }

  @media screen and (max-width: 1000px) {
    .product__description {
      max-width: 100%;
      margin-right: 5px;
    }
  }
</style>
