<script>
  let username = "";
  let password1 = "";
  let password2 = "";

  const register = async (event) => {
    event.preventDefault();
    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }

    const res = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        username,
        password: password1,
        confirmPassword: password2,
      }),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert("Registered!");
      window.location.href = "/login";
    } else if (res.status === 409) {
      alert("Username already exists");
    } else {
      alert(`Registration failed: ${data.msg}`);
    }
  };

  export let active;
</script>

<main>
  <form class="register-form" on:submit|preventDefault={register}>
    <h2 class="middle">Register</h2>
    <input class="left" type="text" id="email" placeholder="Email address" />
    <input
      class="right"
      type="text"
      required
      name="username"
      placeholder="Gebruikersnaam"
      bind:value={username}
    />
    <input
      class="left"
      type="password"
      required
      name="password1"
      placeholder="Wachtwoord"
      bind:value={password1}
    />
    <input
      class="right"
      type="password"
      required
      name="password2"
      placeholder="Herhaal wachtwoord"
      bind:value={password2}
    />
    <button type="submit">Registreren</button>
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
    background: #f2f2f2;
    max-width: 720px;
    margin: 100px auto 100px;
    padding: 45px;
    text-align: center;
    /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
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
    background: #ffffff;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }

  form button[type="submit"] {
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

  form button[type="submit"]:hover,
  form button[type="submit"]:active,
  form button[type="submit"]:focus {
    background: #c38eff;
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
