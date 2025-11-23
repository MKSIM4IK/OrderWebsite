import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    document.title = `ServiceFix.pl - ${title}`;
  }, [title]);
}
