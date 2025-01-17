import type { IGetRecordsRo, IRecord } from '@teable/core';
import { IdPrefix } from '@teable/core';
import { keyBy } from 'lodash';
import { useMemo } from 'react';
import { useInstances } from '../context/use-instances';
import { createRecordInstance, recordInstanceFieldMap } from '../model';
import { useFields } from './use-fields';
import { useTableId } from './use-table-id';
import { useViewId } from './use-view-id';

export const useRecords = (query?: IGetRecordsRo, initData?: IRecord[]) => {
  const tableId = useTableId();

  const viewId = useViewId();

  const fields = useFields();

  const instances = useInstances({
    collection: `${IdPrefix.Record}_${tableId}`,
    factory: createRecordInstance,
    queryParams: {
      viewId,
      ...query,
      type: IdPrefix.Record,
    },
    initData,
  });
  return useMemo(() => {
    const fieldMap = keyBy(fields, 'id');
    return instances.map((instance) => recordInstanceFieldMap(instance, fieldMap));
  }, [instances, fields]);
};
