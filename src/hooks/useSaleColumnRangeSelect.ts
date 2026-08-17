import { useState, useCallback } from 'react';

export function useSaleColumnRangeSelect() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());
  const [anchorKey, setAnchorKey] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setSelectedKeys(prev => {
      if (prev.size === 1 && prev.has(key)) {
        setAnchorKey(null);
        return new Set();
      }
      setAnchorKey(key);
      return new Set([key]);
    });
  }, []);

  const selectRange = useCallback((key: string, orderedKeys: string[]) => {
    setSelectedKeys(prev => {
      if (!anchorKey) {
        setAnchorKey(key);
        return new Set([key]);
      }
      const anchorIdx = orderedKeys.indexOf(anchorKey);
      const targetIdx = orderedKeys.indexOf(key);
      if (anchorIdx === -1 || targetIdx === -1) {
        setAnchorKey(key);
        return new Set([key]);
      }
      const start = Math.min(anchorIdx, targetIdx);
      const end = Math.max(anchorIdx, targetIdx);
      const newSelection = new Set<string>();
      for (let i = start; i <= end; i++) {
        newSelection.add(orderedKeys[i]);
      }
      setAnchorKey(key);
      return newSelection;
    });
  }, [anchorKey]);

  const clear = useCallback(() => {
    setSelectedKeys(new Set());
    setAnchorKey(null);
  }, []);

  return { selectedKeys, toggle, selectRange, clear };
}
