<script>
  export let active;
</script>

<nav>
  <ul>
    <li class="left"><a class:active={active === "/"} href="/">Home</a></li>
    <li class="left"><a href="zoek-pagina.html">Zoeken</a></li>
    <li class="right">
      <a class:active={active === "/login"} href="/login">Login</a>
    </li>
    <li class="right"><a href="nee.html">Contact</a></li>
    <li class="right"><a href="admin.html">Admin</a></li>
  </ul>
</nav>

<style>
  nav {
    margin: 0;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 9999;
  }

  nav > ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #a95dff;
  }

  nav > ul > li.left {
    float: left;
    list-style-type: none;
  }

  nav > ul > li.right {
    float: right;
    list-style-type: none;
  }

  nav > ul > li > a {
    display: block;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  nav > ul > li > a:hover {
    background-color: black;
    color: white !important;
  }

  @media screen and (max-width: 600px) {
    nav {
      position: relative;
    }

    nav > ul > li.left,
    nav > ul > li.right {
      float: none;
    }
  }
</style>
