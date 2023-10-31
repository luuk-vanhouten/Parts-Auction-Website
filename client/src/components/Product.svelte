<script>
  import page from "page";

  function goToProduct() {
    page.redirect(`/product/${product.id}`);
  }

  export let product;
</script>

<div class="product">
  <h2>{product.name}</h2>
  <img src={product.image} alt={product.name} />
  <p><b>{product.category_name}</b></p>
  <p>{product.description}</p>
  <p>€{product.current_bid}</p>
  <input
    type="button"
    class="product-button"
    value="Bekijk product"
    on:click={goToProduct}
  />
</div>

<style>
  img {
    max-width: 300px;
  }

  .product-button {
    outline: 0;
    background: #a95dff;
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

  .product-button:hover,
  .product-button:active,
  .product-button:focus {
    background: black;
    color: white;
  }

  .product {
    padding: 10px;
    background-color: #f2f2f2;
  }
</style>
