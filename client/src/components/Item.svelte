<script>
  import page from "page";

  function goToItem() {
    page.redirect(`/item/${item.id}`);
  }

  export let item;
</script>

<div class="item">
  <h2>{item.name}</h2>
  <img src={item.image} height="200px" width="300px" alt={item.name} />
  <h4>{item.category_name}</h4>
  <p>{item.description}</p>
  <p>€{item.current_bid}</p>
  <input
    type="button"
    class="item-button"
    value="Bekijk product"
    on:click={goToItem}
  />
</div>

<style>
  .item-button {
    outline: 0;
    background: #d7b4ff;
    width: 100%;
    border: 0;
    padding: 15px;
    color: black;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
    grid-column: 1 / span 2;
  }

  .item-button:hover,
  .item-button:active,
  .item-button:focus {
    background: black;
    color: white;
  }

  .item {
    padding: 10px;
    background-color: #f2f2f2;
  }

  /* .item {
    display: grid;
    grid-template-areas:
      "titel titel"
      "afbeelding prijs"
      "afbeelding bestel-knop"
      "beschrijving beschrijving";
    grid-gap: 1rem;
    margin: 1rem;
  }

  .title {
    grid-area: titel;
    margin: 5px;
  }

  .image {
    grid-area: afbeelding;
  }

  .price {
    grid-area: prijs;
    margin: 0;
  }

  .product-buttton {
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

  .product-buttton:hover,
  .product-buttton:active,
  .product-buttton:focus {
    background: #3f8d00;
    color: white;
  }

  .description {
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
    .description {
      max-width: 100%;
      margin-right: 5px;
    }
  } */
</style>
