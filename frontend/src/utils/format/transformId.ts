export function transformId(id: string | any): string {
    if (!id) {
      return '';
    }
  
    // Extract digits using regular expression, join them into a single string, and slice the first 5 characters
    return id.match(/\d+(\.\d+)?/g)?.join('').slice(0, 5) || '';
  }