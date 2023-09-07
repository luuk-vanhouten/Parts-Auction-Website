<script>
    export let active;
</script>

<nav>
    <ul>
        <li class="left"><a class:active={active === "/"} href="/">Home</a></li>
        <li class="left"><a href="zoek-pagina.html">Zoeken</a></li>
        <li class="right"><a class:active={active === "/login"} href="/login">Login</a></li>
        <li class="right"><a href="nee.html">Contact</a></li>
        <li class="right"><a href="admin.html">Admin</a></li>
    </ul>
    <!-- <ul>
        <li><a class:active={active === "/"} href="/">Home</a></li>
        <li><a class:active={active === "/about"} href="/about">About</a></li>
    </ul> -->
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
  background-color: #ffb775;
}

nav > ul > li.left {
  float: left;
  list-style-type: none;
}

nav > ul > li.right {
  float: right;
  list-style-type: none;
}

nav > ul > li.zoek-icon > a {
  float: right;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav > ul > li.zoek-icon:hover {
  background-image: url("images/wit-zoek-icon.png");
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

nav > ul > li > input[type="text"] {
  padding: 6px;
  border: none;
  margin-top: 8px;
  margin-right: 16px;
  font-size: 17px;
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


    /* ul {
        list-style-type: none;
    }

    a.active {
        font-weight: bold;
    } */
</style>