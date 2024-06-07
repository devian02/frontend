import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { IntellectualProperty } from '../models/ip.model';
import { IpsService } from '../app/dashboard/ips.service';
import { computed, inject } from '@angular/core';

// Define the structure of the store
export type PublicIPState = {
  ips: IntellectualProperty[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

// Define the initial state of the store
const initialState: PublicIPState = {
  ips: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const PublicIPStore = signalStore(
  withState(initialState),
  withComputed(({ ips, filter }) => ({
    sortedAndFilteredIps: computed(() => {

      const direction = filter.order() === 'asc' ? 1 : -1;

      // Return the IPs sorted by the creation date and filtered by the query
      return ips()
        .sort((a, b) => direction * new Date(a.createdAt as any).getTime() - new Date(b.createdAt as any).getTime())
        .filter((ip) => ip.name.toLowerCase().includes(filter.query().toLowerCase()));

    })
  })),
  withMethods((store, ipsService = inject(IpsService)) => ({
    async loadAll(): Promise<void> {

      patchState(store, { isLoading: true });

      // Load all the public IPs
      ipsService.findAllPublicIps().subscribe((res) => {
        patchState(store, { ips: res, isLoading: false });
      });

    },
    updateQuery(query: string): void {
      // Update the query in the filter
      patchState(store, (state) => ({ filter: { ...state.filter, query } }));
    },
    updateOrder(order: 'asc' | 'desc'): void {
      // Update the order in the filter
      patchState(store, (state) => ({ filter: { ...state.filter, order } }));
    },
  }))
);
