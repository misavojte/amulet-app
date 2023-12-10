<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 5,
        startScore: 50,
        scenario: 'Random',
        priceOfAmulet: 10,
        scoreOnWin: 30,
    };

    const locale = 'pl';
</script>

<App locale={locale} gameConfig={gameConfig} />