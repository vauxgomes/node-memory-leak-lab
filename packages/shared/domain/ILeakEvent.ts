export interface ILeakEvent {
  type: 'GLOBAL_CACHE' | 'EVENT_LISTENER' | 'CLOSURE' | 'UNDEFINED'
  message: string

  // Number of leaks
  activeItems: number
}
