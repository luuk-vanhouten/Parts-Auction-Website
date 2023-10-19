<script>
  import { token, jwtPayload } from "../stores.js";
  import page from "page";

  let username;
  let password;

  async function login(event) {
    event.preventDefault();
    const verified = await verify();
    if (verified) {
      if ($jwtPayload.role === "admin") {
        page.redirect("/admin");
      } else if ($jwtPayload.role === "user") {
        page.redirect("/");
      }
      alert("Inloggen geslaagd, welkom!");
    } else {
      alert("Inloggen mislukt, probeer het opnieuw.");
    }
  }

  async function verify() {
    const response = await fetch("http://localhost:3000/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.status == 200) {
      const { token: tokenString } = await response.json();
      token.set(tokenString);
      return true;
    } else {
      return false;
    }
  }

  export let active;
</script>

<main>
  <form class="login-form" on:submit={login}>
    <h2 class="middle" id="status">Login</h2>
    <input
      class="left"
      type="text"
      required
      placeholder="Gebruikersnaam"
      bind:value={username}
    />
    <input
      class="right"
      type="password"
      required
      placeholder="Wachtwoord"
      bind:value={password}
    />
    <input type="submit" value="Login" />
    <p class="message">
      Nog geen account?
      <a class:active={active === "/register"} href="/register"
        >Maak hier een account aan</a
      >
    </p>
  </form>
</main>

<style>
  form {
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 720px;
    margin: 0 auto 100px;
    margin-top: 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }

  .left {
    grid-column: 1;
  }

  .middle {
    grid-column: 1 / span 2;
  }

  .right {
    grid-column: 2;
  }

  form input[type="text"],
  input[type="password"] {
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  form input[type="submit"] {
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

  form input[type="submit"]:hover,
  form input[type="submit"]:active,
  form input[type="submit"]:focus {
    background: black;
    color: white;
  }

  form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
    grid-column: 1 / span 2;
  }

  form .message a {
    color: #d7b4ff;
  }

  @media screen and (max-width: 800px) {
    .left {
      grid-column: 1 / span 2;
    }

    .middle {
      grid-column: 1 / span 2;
    }

    .right {
      grid-column: 1 / span 2;
    }
  }
</style>
