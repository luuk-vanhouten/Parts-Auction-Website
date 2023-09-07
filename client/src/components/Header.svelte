<script>
  import Image from "/src/assets/Logo.png";

  export let active;
</script>

<header>
  <a class:active={active === "/"} href="/">
    <img src={Image} alt="Logo" width="250px" height="33px" />
  </a>
</header>

<style>
  header {
    padding: 10px;
    margin: 0px;
    text-align: center;
    background: #a95dff;
  }
</style>
