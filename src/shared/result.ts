// Define a generic Result type that can represent either a success or a failure
export type Result<T, E> = {
  isSuccess: true;
  value: T;
} | {
  isSuccess: false;
  error: E;
};

// Helper function to create a successful result
export function ok<T>(value: T): Result<T, never> {
  return { isSuccess: true, value };
}

// Helper function to create a failed result
export function fail<E>(error: E): Result<never, E> {
  return { isSuccess: false, error };
}