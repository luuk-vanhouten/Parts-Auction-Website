<script>
  import { onMount } from "svelte";
  import page from "page";
  import { token, jwtPayload } from "../stores.js";
  export let params;

  let product = null;
  let endTime = null;
  let timeLeft = null;
  let newBid = 0;

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
      newBid = product.current_bid + 1;
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

  async function submitBid() {
    if (newBid > product.current_bid) {
      const res = await fetch(`http://localhost:3000/bid/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          authorization: `Bearer ${$token}`,
        },
        body: JSON.stringify({ amount: newBid, user: $jwtPayload.username }),
      });

      const data = await res.json();
      if (res.status == 200) {
        alert("Je bod is geplaatst!");
        fetchProduct();
      }
      if (res.status == 404) {
        alert("Het product is niet gevonden.");
      }
      if (res.status == 403) {
        alert(`Je mag niet bieden op dit product: ${data.msg}`);
      }
    } else {
      alert("Er ging iets mis met het verwerken van je bod.");
    }
    newBid = product.current_bid + 1;
  }

  export let active;
</script>

<main>
  {#if product}
    <div class="product">
      <h1 class="product__title">{product.name}</h1>
      <img class="product__image" src={product.image} alt={product.name} />
      <p class="product__price">Huidig bod: €{product.current_bid}</p>
      <div class="bid__input">
        {#if $jwtPayload && $jwtPayload.role === "user"}
          <input
            type="number"
            min={product.current_bid + 1}
            bind:value={newBid}
            class="input"
          />
          <button class="button" on:click={submitBid}>Plaats bod</button>
        {:else if $jwtPayload && $jwtPayload.role === "admin"}
          <a class:active={active === "/admin"} href="/admin"
            >Ga naar admin pagina</a
          >
        {:else}
          <a class:active={active === "/login"} href="/login"
            >Log in om te bieden</a
          >
        {/if}
      </div>
      <p class="product__description">{product.description}</p>
      <p class="product__timer">
        {#if timeLeft && timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes <= 0 && timeLeft.seconds <= 0}
          Veiling afgelopen! De winnaar is {product.bids[0].user}!
        {:else if timeLeft}
          Veiling eindigt over:
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        {:else}
          Aan het laden...
        {/if}
      </p>
    </div>

    <div class="bids">
      <h2 class="titel">Biedingen</h2>
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
  .product {
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr; */
    grid-template-areas:
      "titel titel"
      "afbeelding prijs"
      "afbeelding bied-vak"
      "beschrijving timer";
    grid-gap: 1rem;
    margin: 1rem 0 1rem 0;
    background-color: #f2f2f2;
  }

  .bids {
    margin: 2rem 0 2rem 0;
    background-color: #f2f2f2;
  }
  .bids h2 {
    padding: 5px;
    margin: 0;
  }
  .bids ul {
    list-style-type: none;
    margin: 0;
    padding: 5px;
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

  .bid__input {
    display: flex;
    justify-content: space-between;
    grid-area: bied-vak;
    margin-left: 5px;
  }

  .bid__input input {
    flex: 1;
    height: 50px;
    font-size: larger;
    padding: 0 0 0 5px;
    border: 1;
  }

  .bid__input button {
    flex: 1;
    grid-area: bied-vak;
    outline: 0;
    background: #a95dff;
    height: 52.6px !important;
    border: 0;
    margin-right: 100px;
    color: black;
    font-size: 20px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    max-width: 20%;
    cursor: pointer;
  }

  .bid__input button:hover,
  .bid__input button:active,
  .bid__input button:focus {
    background: #c38eff;
    color: black;
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
        "prijs prijs"
        "bied-vak bied-vak"
        "beschrijving beschrijving"
        "timer timer";
    }
  }

  @media screen and (max-width: 1000px) {
    .product__description {
      max-width: 100%;
      margin-right: 5px;
    }
  }
</style>
