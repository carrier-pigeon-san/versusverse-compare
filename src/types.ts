export type Side = 'rust' | 'cpp'
export type Position = Side | 'undecided'
export type LocalArgument = { id: string; side: Side; text: string }
export type SeedArgument = Readonly<LocalArgument & { author: string; helpful: number }>
export type VisitorData = { version: 1; position: Position | null; helpfulIds: string[]; arguments: LocalArgument[] }
export type DisplayArgument = LocalArgument & { author: string; label: string; helpful: number; marked: boolean }
