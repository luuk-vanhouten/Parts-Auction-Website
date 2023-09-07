<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Login from "./pages/Login.svelte";
  import Header from "./components/Header.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });
  router('/about', (ctx) => {
    page = About;
    currentRoute = ctx.pathname;
  });
  router('/login', (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<main>
  <Header active={currentRoute} />
  <svelte:component this={page} {params} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
  background-color: #ffffff !important;
  margin: 0px !important;
  font-family: Arial, Helvetica, sans-serif !important;
}

main {
  margin-left: 10px !important;
  margin-right: 10px !important;
  position: relative;
  min-height: 50vh;
  /* padding-bottom: 6rem; */
}

</style>
