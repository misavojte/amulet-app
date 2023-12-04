<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 5,
        startScore: 30,
        scenario: 'Random',
        priceOfAmulet: 20,
        scoreOnWin: 30,
    };

    const locale = 'cs';
</script>

<App locale={locale} gameConfig={gameConfig} />