import { useQuery, useQueries } from "@tanstack/react-query"
import type { UseQueryOptions } from "@tanstack/react-query"
import type { NewsItem, SourceID, SourceResponse } from "@shared/types"

const DEFAULT_STALE_TIME = 30 * 60 * 1000 // 30 minutes
const DEFAULT_GC_TIME = 5 * 60 * 1000 // 5 minutes

export function useNewsQuery(
  sourceId: SourceID,
  options?: Partial<UseQueryOptions<SourceResponse>>,
) {
  return useQuery({
    queryKey: ["source", sourceId],
    queryFn: async () => {
      const response = await fetch(`/api/s?id=${sourceId}`)
      if (!response.ok) throw new Error("Failed to fetch news")
      return response.json() as Promise<SourceResponse>
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    refetchOnMount: false,
    refetchOnReconnect: false,
    ...options,
  })
}

export function useNewsQueries(
  sourceIds: SourceID[],
  options?: Partial<UseQueryOptions<SourceResponse>>,
) {
  return useQueries({
    queries: sourceIds.map(sourceId => ({
      queryKey: ["source", sourceId],
      queryFn: async () => {
        const response = await fetch(`/api/s?id=${sourceId}`)
        if (!response.ok) throw new Error(`Failed to fetch news for ${sourceId}`)
        return response.json() as Promise<SourceResponse>
      },
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_GC_TIME,
      refetchOnMount: false,
      refetchOnReconnect: false,
      ...options,
    })),
  })
}

export function useAllNewsItems(
  sourceId: SourceID,
  options?: Partial<UseQueryOptions<NewsItem[]>>,
) {
  return useQuery({
    queryKey: ["news-items", sourceId],
    queryFn: async () => {
      const response = await fetch(`/api/s?id=${sourceId}`)
      if (!response.ok) throw new Error("Failed to fetch news items")
      const data = (await response.json()) as SourceResponse
      return data.items
    },
    staleTime: DEFAULT_STALE_TIME,
    gcTime: DEFAULT_GC_TIME,
    refetchOnMount: false,
    ...options,
  })
}
