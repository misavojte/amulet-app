<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 11,
        startScore: 100,
        scenario: 'ZigZag',
        priceOfAmulet: 10,
        scoreOnWin: 30,
    };

    const locale = 'en';
</script>

<App locale={locale} gameConfig={gameConfig} />