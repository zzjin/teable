import type { IGraphVo } from '@teable-group/core';
import { TablePath } from '@teable-group/openapi/src/table';
import { axios } from '../config/axios';
import { urlBuilder } from './utils';

export const getGraph = async ({
  tableId,
  viewId,
  cell,
}: {
  tableId: string;
  viewId?: string;
  cell: [number, number];
}) => {
  return axios.post<IGraphVo>(
    urlBuilder(TablePath.GET_CELL_GRAPH_URL, {
      params: { tableId },
    }),
    { cell, viewId }
  );
};