<script>
  export let active;
</script>

<footer>
  <ul>
    <li><a href="nee.html">Voorwaarden</a></li>
    <li><a class:active={active === "/about"} href="/about">Over ons</a></li>
    <li><a href="nee.html">Contactinfo</a></li>
  </ul>
</footer>

<style>
  footer {
    padding: 20px;
    margin: 0px;
    text-align: center;
    background: #a95dff;
    color: black;
    position: relative;
    bottom: 0;
    height: 7rem;
  }

  footer > ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  footer > ul > li {
    list-style-type: none;
    margin: 10px;
  }

  footer > ul > li > a {
    color: black;
    text-align: center;
    padding: 10px 20px;
    text-decoration: none;
  }

  footer > ul > li :hover {
    background-color: black;
    color: white;
  }
</style>
