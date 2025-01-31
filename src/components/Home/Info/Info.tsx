import { useSearchParams } from 'react-router-dom'
import { Mine } from '../../Mine/Mine'
import { Blocks } from '../Blocks/Blocks'
import { Coin } from '../Coin/Coin'
import { Energy } from '../Energy/Energy'
import { Progress } from '../Progress/Progress'
import { Score } from '../Score/Score'

export function Info() {
	const [searchParams, setSearchParams] = useSearchParams()

	return (
		<>
			<Blocks />
			<Score />
			<Progress />
			{searchParams.get('mine') == 'true' && <Mine />}
			<Coin />
			<Energy />
		</>
	)
}
