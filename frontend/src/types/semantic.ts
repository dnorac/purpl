// Common Semantic UI React event handler types
export interface SemanticInputChangeData {
  name: string;
  value: string;
}

export interface SemanticCheckboxChangeData {
  name: string;
  checked: boolean;
}

export type SemanticInputChangeHandler = (
  event: React.SyntheticEvent,
  data: SemanticInputChangeData
) => void;

export type SemanticCheckboxChangeHandler = (
  event: React.SyntheticEvent,
  data: SemanticCheckboxChangeData
) => void;
