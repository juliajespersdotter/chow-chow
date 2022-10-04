import { matchSorter } from 'match-sorter'

export function matchSorterFn(rows, id, filterValue) {
	return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
}
