<script>
  import router from "page";

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import Product from "./pages/Item.svelte";

  import Header from "./components/Header.svelte";
  import NavBar from "./components/NavBar.svelte";
  import Footer from "./components/Footer.svelte";

  let page;
  let params;
  let currentRoute;

  router("/", (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router("/about", (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
  });
  router("/login", (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
  });
  router("/register", (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
  });
  router("/item/:id", (ctx) => {
    page = Product;
    params = ctx.params;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<body>
  <Header active={currentRoute} />
  <NavBar active={currentRoute} />
  <main>
    <svelte:component this={page} {params} />
  </main>
  <Footer active={currentRoute} />
</body>

<style>
  :root {
    /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
    font-family: Arial, Helvetica, sans-serif !important;
    /* background-color: #a95dff; */
  }

  main {
    margin-left: 10px !important;
    margin-right: 10px !important;
    position: relative;
    min-height: 50vh;
    /* padding-bottom: 6rem; */
  }
</style>
