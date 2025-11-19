// Test setup file
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_STORAGE = ':memory:'; // Use in-memory database for tests
// Ensure we use SQLite for tests, not PostgreSQL
process.env.DB_DIALECT = '';
process.env.DATABASE_URL = '';

// Suppress console.log during tests unless explicitly needed
if (!process.env.VERBOSE_TESTS) {
  console.log = jest.fn();
  console.info = jest.fn();
}

// Global test timeout
jest.setTimeout(30000); // Increased timeout for database operations
