<script>
  import { token, jwtPayload } from "../stores.js";

  function logout() {
    token.set("");
  }

  export let active;
</script>

<nav>
  <ul>
    <li class="left"><a class:active={active === "/"} href="/">Home</a></li>
    <li class="left">
      <a class:active={active === "/search"} href="/search">Zoeken</a>
    </li>

    {#if $token === ""}
      <li class="right">
        <a class:active={active === "/login"} href="/login">Login</a>
      </li>
      <li class="right">
        <a class:active={active === "/register"} href="/register">Registreren</a
        >
      </li>
    {/if}

    {#if $token !== ""}
      <li class="right">
        <a class:active={active === "/"} on:click={logout} href="/">Uitloggen</a
        >
      </li>
      <li class="right">
        <a class:active={active === "/account"} href="/account">Mijn account</a>
      </li>
    {/if}

    {#if $token !== ""}
      {#if $jwtPayload.role === "admin"}
        <li class="right">
          <a class:active={active === "/admin"} href="/admin">Admin</a>
        </li>
      {/if}
    {/if}
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
