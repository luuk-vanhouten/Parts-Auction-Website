<script>
  import page from "page";

  function goToItem() {
    page.redirect(`/item/${item.id}`);
  }

  export let item;
</script>

<div class="item">
  <h2>{item.name}</h2>
  <img src={item.image} alt={item.name} />
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
  img {
    max-width: 300px;
  }

  .item-button {
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
</style>
