<script>
    import App from './App.svelte';
</script>

<style>
    :global(html, body) {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
    }

    :global(body) {
        height: 100vh;display:flex;flex-direction:column;
    font-family: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"
}
</style>

<App />