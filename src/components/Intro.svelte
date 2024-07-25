<script lang="ts">
	import Button from './UIButton.svelte';
	import { createEventDispatcher } from 'svelte';
	// import { experimentStore } from "$lib/stores/experimentStore";
	// import { getAuthAnonymousUser } from "$lib/config/firebase";
	import { onMount } from 'svelte';
	import IntroEstimator from './IntroEstimator.svelte';

	// let isReady = false;
	let isReady = true;
	let revealMore = false;

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		if (!isReady) return;
		dispatch('startExperiment');
	};

	const setExperiment = async () => {
		/*const user = await getAuthAnonymousUser();
    const fourRandomDigits = Math.floor(1000 + Math.random() * 9000);
    experimentStore.set({
      participant: user,
      session: Date.now() + "-" + fourRandomDigits,
      events: [],
    });
    isReady = true;*/
	};

	onMount(() => {
		setExperiment();
	});
</script>

<div>
	<h1>AI Vizionáři: Výzkum subjektivních představ</h1>
	<h2>Informovaný souhlas s účastí na výzkumu</h2>
	<p>
		Vítejte v online výzkumu pod názvem "AI vizionáři", prováděném v rámci Olomoucké kognitivní
		laboratoře CO-LAB na Filozofické fakultě Univerzity Palackého v Olomouci.
	</p>
	<IntroEstimator timeText={'10 min'} questionText={'22 kompozic'} />
	<p>
		Cílem výzkumu je testování metodologie pro zkoumání subjektivních představ prostřednictvím umělé
		inteligence (AI). Projekt se zaměřuje na generování obrázků pomocí AI, které jsou systematicky
		zařazeny do 22 kategorií inspirovaných náboženskými tradicemi, a následné zkoumání subjektivních
		asociací účastníků výzkumu. Primárně jde však o testování nové potenciální metody, která by
		mohla být využita při akademickém výzkumu.
	</p>
	<p>
		Účastníci v online verzi budou vybírat obrázky, které nejlépe odpovídají jejich subjektivním
		představám. Po ukončení experimentu a zodpovězení 8 krátkých otázek bude účastníkům zobrazen
		graf, který zobrazí, jaké faktory mají vliv na účastníkovy představy. Odpovědi z dotazníkových
		otázek se do grafu nezapočítávají.
	</p>
	<p>
		Experiment je nutné spustit na notebooku nebo počítači s funkčním připojením k internetu, není
		nakonfigurován na telefony a tablety.
	</p>
	<p>Celková doba trvání experimentu: 10 minut</p>
	<p>Experiment je určen osobám starším 18 let.</p>
	<p>
		Veškerá data budou uchovávána na chráněném úložišti. Členové výzkumného týmu jsou poučeni o
		zákazu sdělování informací. Každý účastník bude veden pod anonymizačním kódem. Anonymizovaná
		data z experimentu budou použita pro napsání odborného článku. Účastníci mají právo z výzkumu
		odstoupit a požádat o vymazání svých dat, nejpozději však do 30 dnů od naměření dat.
	</p>
	<p>
		<i>Zodpovědná osoba: Mgr. Markéta Muczková.</i>
	</p>
	<p>
		<i>
			Kontakt: <a href="mailto:marketa.muczkova01@upol.cz">marketa.muczkova01@upol.cz</a>
		</i>
	</p>
	{#if !revealMore}
		<br />
		<Button
			text="Pokračovat"
			on:click={() => {
				revealMore = true;
			}}
		/>
	{/if}
	{#if revealMore}
		<h2>Souhlas se zpracováním osobních údajů</h2>
		<p>
			Uděluji tímto souhlas výzkumnému týmu kognitivní laboratoře CO-LAB se sídlem v Olomouci, tř.
			Svobody 26, IČ : 61989592 (dále jen „správce“), aby ve smyslu nařízení č. 679/2016 o ochraně
			osobních údajů fyzických osob (dále jen „GDPR“) zpracovával tyto osobní údaje:
		</p>
		<ul>
			<li>Data z dotazníku (pohlaví, vyznání, věk)</li>
			<li>Data z interaktivního výzkumu</li>
			<li>E-mail (v případě uvedení)</li>
		</ul>
		<p>
			Tyto osobní údaje je nutné zpracovat pro účel výzkumu. Údaje budou správcem zpracovány po dobu
			nezbytně nutnou k naplnění účelu nebo do odvolání souhlasu. S výše uvedeným zpracováním
			uděluji výslovný souhlas. Souhlas lze vzít zpět, a to zasláním e-mailu na kontaktní email.
			Zpracování osobních údajů je prováděno správcem, osobní údaje však pro správce mohou
			zpracovávat i tito zpracovatelé:
		</p>
		<ul>
			<li>Pověření a proškolení ostatní členové výzkumného týmu</li>
		</ul>
		<p>Dle GDPR máte právo:</p>
		<ul>
			<li>Vzít souhlas zpět</li>
			<li>Požadovat informace, jaké vaše informace zpracováváme</li>
			<li>Požádat vysvětlení ohledně zpracování osobních údajů</li>
			<li>Vyžádat si přístup k těmto údajům</li>
			<li>
				Požadovat opravu, výmaz osobních údajů, omezení zpracování a vznést námitku proti zpracování
			</li>
		</ul>
		<p>
			Prohlašuji, že jsem byl/a dostatečně informován/a o výzkumu a jeho cílech, chápu možná rizika
			a práva, která mi náleží. Souhlasím s účastí na tomto výzkumu pod výše uvedenými podmínkami a
			souhlasím se zpracováním osobních údajů.
		</p>
		<br />
		<Button
			text="Souhlasím, zahájit experiment"
			on:click={handleClick}
			size="big"
			disabled={!isReady}
		/>
	{/if}
</div>

<style>
	/* Center it on the screen */
	h1 {
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}
	h1,
	h2 {
		text-align: center;
	}
	p {
		margin: 0;
		width: 100%;
	}
	ul {
		width: 100%;
	}
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-top: 4rem;
	}
</style>
