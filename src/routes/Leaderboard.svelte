<script lang="ts">
    import type { LeaderboardEntryBase, LeaderboardEntry } from '$lib';
    import { Circle3 } from 'svelte-loading-spinners';
    import { getLeaderboard, writeLeaderboardEntry } from '../firebase';

    export let userName: string;
    export let score: number;
    export let userId: string;

    let leaderboard: LeaderboardEntryBase[] = [];
    let loading = true;
    let showAsLooser = false;

    const load = async () => {
        leaderboard = await getLeaderboard();
        // try to fit the user in the leaderboard
        const userIndex = leaderboard.findIndex(entry => entry.score < score);
        if (userIndex !== -1) {
            leaderboard.splice(userIndex, 0, {
                userName,
                score,
                mark: true
            });
            if (leaderboard.length > 10) {
                leaderboard.pop();
            }
        } else {
            if (leaderboard.length > 9) {
                leaderboard.pop();
            }
            showAsLooser = true;
        }
        loading = false;
        const entry: LeaderboardEntry = {userName, score, timestamp: Date.now(), userId};
        writeLeaderboardEntry(entry);
    };

    load();
</script>

{#if loading}
    <div class="center">
        <Circle3 />
        <p>
            Načítám výsledky
        </p>
    </div>
{:else}
    <div class="leaderboard">
        <table>
            <thead>
                <tr>
                    <th>
                        Pořadí
                    </th>
                    <th>
                        Jméno
                    </th>
                    <th>
                        Skóre
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each leaderboard as entry, i}
                    <tr class:mark={entry.mark}>
                        <td>
                            {i + 1}
                        </td>
                        <td>
                            {entry.userName}
                        </td>
                        <td>
                            {entry.score}
                        </td>
                    </tr>
                {/each}
            </tbody>
            {#if showAsLooser}
                <tbody>
                    <tr class="mark">
                        <td>
                            ...
                        </td>
                        <td>
                            {userName}
                        </td>
                        <td>
                            {score}
                        </td>
                    </tr>
                </tbody>
            {/if}
        </table>
    </div>
{/if}

<style>
    .center {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
        height: 100%;
        width: 100%;
    }

    .leaderboard {
        height: 100%;
        width: 80%;
    }

    table {
        border-collapse: collapse;
        width: 100%;
        font-size: 13px;
    }

    th, td {
        padding: 4px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    tr.mark {
        background: #f6ba52;
    }

    tr.mark td {
        color: #fff;
    }
</style>



