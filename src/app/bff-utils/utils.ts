/**
 * Functions to execute when a request succeeds/fails.
 */
export interface ResultHandler {
  onSuccess: () => void;
  onFail: (errors: string[]) => void;
}
