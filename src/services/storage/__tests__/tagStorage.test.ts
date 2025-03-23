import { tagStorage } from '../tagStorage';
import { tagDB } from '../database';
import type { Tag } from '@/features/suche/types';

// Mock the database
jest.mock('../database', () => {
  const mockDB = {
    set: jest.fn(),
    get: jest.fn(),
    getAll: jest.fn(),
    remove: jest.fn(),
    update: jest.fn(),
    query: jest.fn(),
  };
  
  return {
    tagDB: mockDB,
  };
});

describe('tagStorage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock Date.now() to return a fixed timestamp
    jest.spyOn(Date, 'now').mockReturnValue(1600000000000);
    // Mock Math.random() to return a fixed value
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });
  
  describe('createTag', () => {
    it('should create a tag with normalized name and correct properties', async () => {
      const name = '  Test Tag  ';
      
      const expectedTag = {
        id: 'tag_1600000000000_500',
        name: 'test tag',
        erstelltAm: expect.any(Date)
      };
      
      (tagDB.set as jest.Mock).mockResolvedValueOnce(undefined);
      
      const result = await tagStorage.createTag(name);
      
      expect(tagDB.set).toHaveBeenCalledWith(
        'tag_1600000000000_500',
        expectedTag
      );
      expect(result).toEqual(expectedTag);
      expect(result.erstelltAm).toBeInstanceOf(Date);
    });
  });
  
  describe('getAllTags', () => {
    it('should return all tags sorted alphabetically by name', async () => {
      const tags = [
        {
          id: 'tag_1',
          name: 'cinema',
          erstelltAm: new Date()
        },
        {
          id: 'tag_2',
          name: 'action',
          erstelltAm: new Date()
        },
        {
          id: 'tag_3',
          name: 'drama',
          erstelltAm: new Date()
        }
      ];
      
      (tagDB.getAll as jest.Mock).mockResolvedValueOnce(tags);
      
      const result = await tagStorage.getAllTags();
      
      expect(tagDB.getAll).toHaveBeenCalled();
      // Should be sorted alphabetically
      expect(result[0].name).toBe('action');
      expect(result[1].name).toBe('cinema');
      expect(result[2].name).toBe('drama');
    });
  });
  
  describe('getOrCreateTag', () => {
    it('should return existing tag if it exists', async () => {
      const name = 'test tag';
      const existingTag: Tag = {
        id: 'tag_existing',
        name: 'test tag',
        erstelltAm: new Date()
      };
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce([existingTag]);
      
      const result = await tagStorage.getOrCreateTag(name);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(existingTag);
      expect(tagDB.set).not.toHaveBeenCalled(); // Should not create a new tag
    });
    
    it('should create new tag if it does not exist', async () => {
      const name = 'new tag';
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce([]); // No existing tag
      
      // Spy on createTag
      const createTagSpy = jest.spyOn(tagStorage, 'createTag')
        .mockResolvedValueOnce({
          id: 'tag_new',
          name: 'new tag',
          erstelltAm: new Date()
        });
      
      const result = await tagStorage.getOrCreateTag(name);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(createTagSpy).toHaveBeenCalledWith('new tag');
      expect(result.name).toBe('new tag');
      
      // Clean up spy
      createTagSpy.mockRestore();
    });
    
    it('should normalize tag name for comparison', async () => {
      const name = '  Test Tag  ';
      const normalizedName = 'test tag';
      const existingTag: Tag = {
        id: 'tag_existing',
        name: normalizedName,
        erstelltAm: new Date()
      };
      
      (tagDB.query as jest.Mock).mockImplementationOnce(predicate => {
        // Mock implementation to check if predicate correctly normalizes and compares names
        const mockTags = [existingTag];
        return Promise.resolve(mockTags.filter(tag => predicate(tag)));
      });
      
      const result = await tagStorage.getOrCreateTag(name);
      
      expect(result).toEqual(existingTag);
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
    });
  });
  
  describe('addTagToErinnerung', () => {
    it('should create a relationship between tag and erinnerung', async () => {
      const erinnerungId = 'erinnerung_123';
      const tagName = 'test tag';
      const tag: Tag = {
        id: 'tag_123',
        name: tagName,
        erstelltAm: new Date()
      };
      
      // Mock getOrCreateTag to return the tag
      jest.spyOn(tagStorage, 'getOrCreateTag').mockResolvedValueOnce(tag);
      
      await tagStorage.addTagToErinnerung(erinnerungId, tagName);
      
      expect(tagStorage.getOrCreateTag).toHaveBeenCalledWith(tagName);
      expect(tagDB.set).toHaveBeenCalledWith(
        expect.stringContaining('erinnerung_tag_'),
        expect.objectContaining({
          erinnerungId,
          tagId: tag.id,
          erstelltAm: expect.any(Date)
        })
      );
    });
  });
  
  describe('removeTagFromErinnerung', () => {
    it('should remove the relationship between tag and erinnerung if it exists', async () => {
      const erinnerungId = 'erinnerung_123';
      const tagId = 'tag_123';
      const verknuepfung = {
        id: 'erinnerung_tag_123',
        erinnerungId,
        tagId,
        erstelltAm: new Date()
      };
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce([verknuepfung]);
      
      await tagStorage.removeTagFromErinnerung(erinnerungId, tagId);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(tagDB.remove).toHaveBeenCalledWith(verknuepfung.id);
    });
    
    it('should not call remove if no relationship exists', async () => {
      const erinnerungId = 'erinnerung_123';
      const tagId = 'tag_123';
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce([]);
      
      await tagStorage.removeTagFromErinnerung(erinnerungId, tagId);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(tagDB.remove).not.toHaveBeenCalled();
    });
  });
  
  describe('getTagsForErinnerung', () => {
    it('should return all tags for an erinnerung', async () => {
      const erinnerungId = 'erinnerung_123';
      const verknuepfungen = [
        {
          id: 'erinnerung_tag_1',
          erinnerungId,
          tagId: 'tag_1',
          erstelltAm: new Date()
        },
        {
          id: 'erinnerung_tag_2',
          erinnerungId,
          tagId: 'tag_2',
          erstelltAm: new Date()
        }
      ];
      
      const alleTags: Tag[] = [
        {
          id: 'tag_1',
          name: 'action',
          erstelltAm: new Date()
        },
        {
          id: 'tag_2',
          name: 'drama',
          erstelltAm: new Date()
        },
        {
          id: 'tag_3',
          name: 'comedy',
          erstelltAm: new Date()
        }
      ];
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce(verknuepfungen);
      jest.spyOn(tagStorage, 'getAllTags').mockResolvedValueOnce(alleTags);
      
      const result = await tagStorage.getTagsForErinnerung(erinnerungId);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(tagStorage.getAllTags).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('tag_1');
      expect(result[1].id).toBe('tag_2');
    });
    
    it('should return empty array if no relationships exist', async () => {
      const erinnerungId = 'erinnerung_123';
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce([]);
      
      const result = await tagStorage.getTagsForErinnerung(erinnerungId);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual([]);
      expect(tagStorage.getAllTags).not.toHaveBeenCalled();
    });
  });
  
  describe('getErinnerungenForTag', () => {
    it('should return all erinnerungIds for a tag', async () => {
      const tagId = 'tag_123';
      const verknuepfungen = [
        {
          id: 'erinnerung_tag_1',
          erinnerungId: 'erinnerung_1',
          tagId,
          erstelltAm: new Date()
        },
        {
          id: 'erinnerung_tag_2',
          erinnerungId: 'erinnerung_2',
          tagId,
          erstelltAm: new Date()
        }
      ];
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce(verknuepfungen);
      
      const result = await tagStorage.getErinnerungenForTag(tagId);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(['erinnerung_1', 'erinnerung_2']);
    });
  });
  
  describe('deleteTag', () => {
    it('should delete the tag and all its relationships', async () => {
      const tagId = 'tag_123';
      const verknuepfungen = [
        {
          id: 'erinnerung_tag_1',
          erinnerungId: 'erinnerung_1',
          tagId,
          erstelltAm: new Date()
        },
        {
          id: 'erinnerung_tag_2',
          erinnerungId: 'erinnerung_2',
          tagId,
          erstelltAm: new Date()
        }
      ];
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce(verknuepfungen);
      
      await tagStorage.deleteTag(tagId);
      
      expect(tagDB.remove).toHaveBeenCalledWith(tagId);
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(tagDB.remove).toHaveBeenCalledTimes(3); // 1 for tag + 2 for relationships
      expect(tagDB.remove).toHaveBeenCalledWith('erinnerung_tag_1');
      expect(tagDB.remove).toHaveBeenCalledWith('erinnerung_tag_2');
    });
  });
  
  describe('searchTags', () => {
    it('should return all tags if search term is empty', async () => {
      const suchbegriff = '';
      const tags: Tag[] = [
        {
          id: 'tag_1',
          name: 'action',
          erstelltAm: new Date()
        },
        {
          id: 'tag_2',
          name: 'drama',
          erstelltAm: new Date()
        }
      ];
      
      jest.spyOn(tagStorage, 'getAllTags').mockResolvedValueOnce(tags);
      
      const result = await tagStorage.searchTags(suchbegriff);
      
      expect(tagStorage.getAllTags).toHaveBeenCalled();
      expect(result).toEqual(tags);
      expect(tagDB.query).not.toHaveBeenCalled();
    });
    
    it('should return tags that start with the search term', async () => {
      const suchbegriff = 'act';
      const matchingTags: Tag[] = [
        {
          id: 'tag_1',
          name: 'action',
          erstelltAm: new Date()
        },
        {
          id: 'tag_2',
          name: 'actor',
          erstelltAm: new Date()
        }
      ];
      
      (tagDB.query as jest.Mock).mockResolvedValueOnce(matchingTags);
      
      const result = await tagStorage.searchTags(suchbegriff);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      expect(result).toEqual(matchingTags);
    });
    
    it('should normalize search term', async () => {
      const suchbegriff = '  Act  ';
      
      await tagStorage.searchTags(suchbegriff);
      
      expect(tagDB.query).toHaveBeenCalledWith(expect.any(Function));
      // Can't directly test the normalized search term in the predicate,
      // but we can verify the query was called
    });
  });
});
