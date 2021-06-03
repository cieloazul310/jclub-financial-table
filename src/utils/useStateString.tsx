import { SortKey } from './AppState';
import { useAppState } from './AppStateContext';
import { useDictionary } from './graphql-hooks';

interface SortStateString {
  field: string | null | undefined;
  sortKey: SortKey;
  sortType: string;
}

export function useSortStateString(): SortStateString {
  const { sortAsc, sortKey } = useAppState();
  const dictionary = useDictionary();

  const field = (() => {
    if (sortKey === 'average_attd') return '平均入場者数';
    if (sortKey === 'unit_price') return '客単価';
    return dictionary ? dictionary[sortKey] : '';
  })();

  const rankSort = sortAsc ? '高い順' : '低い順';
  const valueSort = sortAsc ? '少ない順' : '多い順';
  const sortType = sortKey === 'rank' ? rankSort : valueSort;

  return {
    field,
    sortKey,
    sortType,
  };
}

export function useFilterStateString(): string {
  const { filterCategories } = useAppState();

  return `フィルタ: ${
    filterCategories.length === 4 ? 'なし' : filterCategories.map((category) => (category === 'others' ? 'その他' : category)).join(',')
  }`;
}

export default function useStateString(): {
  sortString: SortStateString;
  filterString: string;
} {
  const sortString = useSortStateString();
  const filterString = useFilterStateString();
  return { sortString, filterString };
}
