import { render, screen } from '@testing-library/svelte';
import { describe, expect, test } from 'vitest';
import Comp from './VotingResults.svelte';
import type { Display } from 'planning-poker-types';

const testDisplays: Display[] = [
	{
		cardValue: 1,
		isHost: false,
		name: 'Test Display 1'
	},
	{
		cardValue: 8,
		isHost: false,
		name: 'Test Display 2'
	},
	{
		cardValue: 0,
		isHost: false,
		name: 'Test Display 3'
	}
];

describe('Component: Card', () => {
	test('non host displays room label and proper button', () => {
		render(Comp, {
			displays: testDisplays
		});
		let voted = 0;
		let notVoted = 0;

		testDisplays.forEach((display) => {
			if (display.cardValue > 0) voted++;
			if (display.cardValue <= 0) notVoted++;
		});

		expect(
			screen.getByRole('heading', { name: `${voted} of ${testDisplays.length} voted` })
		).toBeInTheDocument();

		expect(screen.getAllByLabelText('VoteItem')).toHaveLength(voted);
		expect(screen.getAllByLabelText('NonVoteItem')).toHaveLength(notVoted);
	});
});
