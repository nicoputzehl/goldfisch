import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../database';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  getAllKeys: jest.fn(),
  multiGet: jest.fn(),
  multiRemove: jest.fn(),
}));

describe('Database', () => {
  const testPrefix = 'test';
  let db: Database;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    db = new Database(testPrefix);
  });

  describe('set', () => {
    it('should store data with the correct key', async () => {
      const id = 'test123';
      const data = { name: 'Test Data' };
      
      await db.set(id, data);
      
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        `${testPrefix}:${id}`,
        JSON.stringify(data)
      );
    });

    it('should throw an error if storage fails', async () => {
      const error = new Error('Storage error');
      (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.set('id', {})).rejects.toThrow('Daten konnten nicht gespeichert werden.');
    });
  });

  describe('get', () => {
    it('should retrieve data with the correct key', async () => {
      const id = 'test123';
      const data = { name: 'Test Data' };
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(data));
      
      const result = await db.get(id);
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(`${testPrefix}:${id}`);
      expect(result).toEqual(data);
    });

    it('should return null if item does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await db.get('nonexistent');
      
      expect(result).toBeNull();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.get('id')).rejects.toThrow('Daten konnten nicht abgerufen werden.');
    });
  });

  describe('remove', () => {
    it('should remove data with the correct key', async () => {
      const id = 'test123';
      
      await db.remove(id);
      
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(`${testPrefix}:${id}`);
    });

    it('should throw an error if removal fails', async () => {
      const error = new Error('Removal error');
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.remove('id')).rejects.toThrow('Daten konnten nicht gelöscht werden.');
    });
  });

  describe('getAll', () => {
    it('should return all items with the correct prefix', async () => {
      const keys = [`${testPrefix}:item1`, `${testPrefix}:item2`, 'other:item3'];
      const items = [
        [`${testPrefix}:item1`, JSON.stringify({ id: 'item1', value: 'one' })],
        [`${testPrefix}:item2`, JSON.stringify({ id: 'item2', value: 'two' })],
      ];
      
      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce(keys);
      (AsyncStorage.multiGet as jest.Mock).mockResolvedValueOnce(items);
      
      const result = await db.getAll();
      
      expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
      expect(AsyncStorage.multiGet).toHaveBeenCalledWith([`${testPrefix}:item1`, `${testPrefix}:item2`]);
      expect(result).toEqual([
        { id: 'item1', value: 'one' },
        { id: 'item2', value: 'two' }
      ]);
    });

    it('should return an empty array if no items match the prefix', async () => {
      const keys = ['other:item1', 'different:item2'];
      
      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce(keys);
      
      const result = await db.getAll();
      
      expect(result).toEqual([]);
      expect(AsyncStorage.multiGet).not.toHaveBeenCalled();
    });

    it('should throw an error if retrieval fails', async () => {
      const error = new Error('Retrieval error');
      (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.getAll()).rejects.toThrow('Daten konnten nicht abgerufen werden.');
    });
  });

  describe('update', () => {
    it('should update data with the update function', async () => {
      const id = 'test123';
      const initialData = { name: 'Initial', count: 1 };
      const updateFn = jest.fn(data => ({ ...data, count: data.count + 1 }));
      
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(initialData));
      
      const result = await db.update(id, updateFn);
      
      expect(AsyncStorage.getItem).toHaveBeenCalledWith(`${testPrefix}:${id}`);
      expect(updateFn).toHaveBeenCalledWith(initialData);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        `${testPrefix}:${id}`,
        JSON.stringify({ name: 'Initial', count: 2 })
      );
      expect(result).toEqual({ name: 'Initial', count: 2 });
    });

    it('should return null if item does not exist', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);
      
      const result = await db.update('nonexistent', data => data);
      
      expect(result).toBeNull();
      expect(AsyncStorage.setItem).not.toHaveBeenCalled();
    });

    it('should throw an error if update fails', async () => {
      const error = new Error('Update error');
      (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.update('id', data => data)).rejects.toThrow('Daten konnten nicht aktualisiert werden.');
    });
  });

  describe('query', () => {
    it('should filter items based on predicate', async () => {
      // Define a type for test items
      interface TestItem {
        id: string;
        value: string;
        type: string;
      }

      const items: TestItem[] = [
        { id: 'item1', value: 'one', type: 'A' },
        { id: 'item2', value: 'two', type: 'B' },
        { id: 'item3', value: 'three', type: 'A' }
      ];
      
      // Mock getAll to return all items
      jest.spyOn(db, 'getAll').mockResolvedValueOnce(items);
      
      // Query for type A items - explicitly using the TestItem type
      const result = await db.query<TestItem>(item => item.type === 'A');
      
      expect(result).toEqual([
        { id: 'item1', value: 'one', type: 'A' },
        { id: 'item3', value: 'three', type: 'A' }
      ]);
    });

    it('should throw an error if query fails', async () => {
      const error = new Error('Query error');
      jest.spyOn(db, 'getAll').mockRejectedValueOnce(error);
      
      await expect(db.query(() => true)).rejects.toThrow('Abfrage konnte nicht ausgeführt werden.');
    });
  });

  describe('clear', () => {
    it('should remove all items with the correct prefix', async () => {
      const keys = [`${testPrefix}:item1`, `${testPrefix}:item2`, 'other:item3'];
      
      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce(keys);
      
      await db.clear();
      
      expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
      expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
        `${testPrefix}:item1`, 
        `${testPrefix}:item2`
      ]);
    });

    it('should not call multiRemove if no keys match prefix', async () => {
      const keys = ['other:item1', 'different:item2'];
      
      (AsyncStorage.getAllKeys as jest.Mock).mockResolvedValueOnce(keys);
      
      await db.clear();
      
      expect(AsyncStorage.multiRemove).not.toHaveBeenCalled();
    });

    it('should throw an error if clear fails', async () => {
      const error = new Error('Clear error');
      (AsyncStorage.getAllKeys as jest.Mock).mockRejectedValueOnce(error);
      
      await expect(db.clear()).rejects.toThrow('Daten konnten nicht gelöscht werden.');
    });
  });
});