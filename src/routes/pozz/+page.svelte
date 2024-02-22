<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 11,
        startScore: 110,
        scenario: 'ZigZag',
        priceOfAmulet: 10,
        scoreOnWin: 30,
    };

    const locale = 'pl';
</script>

<App locale={locale} gameConfig={gameConfig} />