<script lang="ts">
	import type { Vote } from 'planning-poker-types';

	export let vote: Vote;

	const voteMessage = vote.value === 0 ? vote.name : `${vote.name}: ${vote.value}`;
</script>

<p aria-label={vote.value > 0 ? 'VoteItem' : 'NonVoteItem'}>
	{voteMessage}
</p>
