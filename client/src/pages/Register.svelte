<script>
  export let params;
  export let active;
</script>

<main>
  <form class="register-form" method="post">
    <h2 class="middle">Registreren</h2>
    <input class="left" type="text" id="email" placeholder="E-mailadres" />
    <input
      class="right"
      type="text"
      id="username"
      placeholder="Gebruikersnaam"
    />
    <input
      class="left"
      type="password"
      id="password1"
      placeholder="Wachtwoord"
    />
    <input
      class="right"
      type="password"
      id="password2"
      placeholder="Herhaal wachtwoord"
    />
    <input class="left" type="text" id="first_name" placeholder="Voornaam" />
    <input class="right" type="text" id="last_name" placeholder="Achternaam" />
    <input
      class="left"
      type="text"
      id="phone_number"
      placeholder="Telefoonnummer"
    />
    <input class="right" type="text" id="city" placeholder="Woonplaats" />
    <input type="submit" id="registreren" value="Account registreren" />
    <p class="message">
      Heeft u al een account? <a
        class:active={active === "/login"}
        href="/login">Log hier in</a
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
    margin: 100px auto 100px;
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
