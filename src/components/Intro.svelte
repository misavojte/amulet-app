<!-- src/components/ConsentForm.svelte -->
<script lang="ts">
	import { _ } from 'svelte-i18n';
	import Button from './UIButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';
	// import IntroEstimator from './IntroEstimator.svelte'; // Uncomment if needed

	let isReady = true;
	let revealMore = false;

	export let rounds = 10;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		if (!isReady) return;
		dispatch('startExperiment');
	};

	const setExperiment = async () => {
		// Implement your experiment setup logic here
		/*
        const user = await getAuthAnonymousUser();
        const fourRandomDigits = Math.floor(1000 + Math.random() * 9000);
        experimentStore.set({
          participant: user,
          session: Date.now() + "-" + fourRandomDigits,
          events: [],
        });
        isReady = true;
        */
	};

	onMount(() => {
		setExperiment();
	});
</script>

<div class="my-12">
	<!-- Title -->
	<h1 class="text-3xl font-bold mb-6 text-center">
		{$_('informedConsent.title')}
	</h1>

	<!-- Participation Consent Section -->
	<section class="mb-8">
		<p class="mb-4 text-justify">
			{$_('informedConsent.participation_consent.consent_statement')}
		</p>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participation_consent.research_goal')}
		</p>
		<p class="mb-4 text-justify">
			{$_({
				id: 'informedConsent.participation_consent.experiment_principle',
				values: { rounds }
			})}
		</p>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participation_consent.post_experiment_info')}
		</p>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participation_consent.duration')}
		</p>
	</section>

	<!-- Participant Rights and Protection Section -->
	<section class="mb-8">
		<h2 class="text-2xl font-semibold mb-4">
			{$_('informedConsent.participant_rights_and_protection.information_protection_title')}
		</h2>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participant_rights_and_protection.data_storage')}
		</p>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participant_rights_and_protection.withdrawal_right')}
		</p>
		<p class="mb-4 text-justify">
			{$_('informedConsent.participant_rights_and_protection.responsible_person')}
		</p>
		<p class="italic text-gray-700">
			{$_('informedConsent.participant_rights_and_protection.contact')}
		</p>
	</section>

	<!-- Potential Risks and Minimization Section -->
	<section class="mb-8">
		<h2 class="text-2xl font-semibold mb-4">
			{$_('informedConsent.potential_risks_and_minimization.risk_statement')}
		</h2>
		<p class="mb-4 text-justify">
			{$_('informedConsent.potential_risks_and_minimization.potential_risks')}
		</p>
	</section>

	<!-- Proceed Button -->
	{#if !revealMore}
		<div class="flex justify-center mb-8">
			<Button
				text={$_('informedConsent.continue')}
				on:click={() => {
					revealMore = true;
				}}
			/>
		</div>
	{/if}

	<!-- Personal Data Processing Consent Section -->
	{#if revealMore}
		<section class="mb-8">
			<h2 class="text-2xl font-semibold mb-4">
				{$_('informedConsent.personal_data_processing_consent.processing_consent_title')}
			</h2>
			<p class="mb-4 text-justify">
				{$_('informedConsent.personal_data_processing_consent.consent_declaration')}
			</p>
			<ul class="list-disc list-inside mb-4">
				<li>{$_('informedConsent.personal_data_processing_consent.personal_data_type_1')}</li>
				<li>{$_('informedConsent.personal_data_processing_consent.personal_data_type_2')}</li>
				<li>{$_('informedConsent.personal_data_processing_consent.personal_data_type_3')}</li>
			</ul>
			<p class="mb-4 text-justify">
				{$_('informedConsent.personal_data_processing_consent.data_processing_purpose')}
			</p>
			<p class="mb-4 text-justify">
				{$_('informedConsent.personal_data_processing_consent.withdrawal_statement')}
			</p>

			<h2 class="text-2xl font-semibold mb-4">
				{$_('informedConsent.gdpr_rights.rights_statement')}
			</h2>
			<ul class="list-disc list-inside mb-4">
				<li>{$_('informedConsent.gdpr_rights.right_1')}</li>
				<li>{$_('informedConsent.gdpr_rights.right_2')}</li>
				<li>{$_('informedConsent.gdpr_rights.right_3')}</li>
				<li>{$_('informedConsent.gdpr_rights.right_4')}</li>
				<li>{$_('informedConsent.gdpr_rights.right_5')}</li>
			</ul>

			<p class="mb-4 text-justify">
				{$_('informedConsent.final_declaration.declaration')}
			</p>

			<div class="flex justify-center">
				<Button
					text={$_('informedConsent.agreeAndStart')}
					on:click={handleClick}
					disabled={!isReady}
				/>
			</div>
		</section>
	{/if}
</div>
