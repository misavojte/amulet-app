<script>
    import App from "../../components/App.svelte";

    const gameConfig = {
        numberOfRounds: 8,
        startScore: 40,
        scenario: 'AlwaysLose',
        priceOfAmulet: 5,
        scoreOnWin: 20,
    };

    const locale = 'cs';
</script>

<App locale={locale} gameConfig={gameConfig} />