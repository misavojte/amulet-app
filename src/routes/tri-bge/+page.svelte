<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 5,
        startScore: 50,
        scenario: 'ZigZag',
        priceOfAmulet: 10,
        scoreOnWin: 30,
    };

    const locale = 'cs';
</script>

<App locale={locale} gameConfig={gameConfig} />