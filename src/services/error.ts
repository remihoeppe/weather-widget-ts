export type CustomError = {
    message: string | ErrorMessage;
    resolution?: string | undefined;
};

export const enum ErrorMessage {
    servorErrorMessage = "An error occur while attempting to fetch the data from the server",
}

// Typechecking our error messages
// - if null return false otherwise return true
// - if message field exise it gets returned
export const isError = (
    toBeDetermined: any | CustomError,
): toBeDetermined is CustomError => {
    return !!(toBeDetermined as CustomError)?.message;
};

// If object as a field of message
