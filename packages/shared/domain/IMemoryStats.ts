export interface IMemoryStats {
  // Resident Set Size: Total used memory
  rss: number;

  // Heap Total: Total reserved memory (V8 memory)
  heapTotal: number;

  // Heap Used
  heapUsed: number;

  // External: Used for streams/fs
  external: number;

  // Timestamp
  timestamp: number;
}
