import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

describe('StarshipsService', () => {
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StarshipsService],
    }).compile();

    service = module.get<StarshipsService>(StarshipsService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de vaisseaux', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('devrait retourner les vaisseaux initiaux', () => {
      const result = service.findAll();
      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'USS Enterprise',
            model: 'NCC-1701-D',
          }),
        ]),
      );
    });
  });

  describe('findOne', () => {
    it('devrait retourner un vaisseau par son id', () => {
      const starships = service.findAll();
      const firstStarship = starships[0];
      const result = service.findOne(firstStarship.id);
      expect(result).toEqual(firstStarship);
    });

    it("devrait lever une NotFoundException si le vaisseau n'existe pas", () => {
      expect(() => service.findOne('id-inexistant')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('devrait créer un nouveau vaisseau', () => {
      const createDto: CreateStarshipDto = {
        name: 'Battlestar Galactica',
        model: 'BS-75',
        crew: 2500,
        status: 'operational',
      };

      const initialCount = service.findAll().length;
      const result = service.create(createDto);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe(createDto.name);
      expect(result.model).toBe(createDto.model);
      expect(result.crew).toBe(createDto.crew);
      expect(result.status).toBe(createDto.status);
      expect(service.findAll().length).toBe(initialCount + 1);
    });

    it('devrait générer un id unique pour chaque nouveau vaisseau', () => {
      const createDto: CreateStarshipDto = {
        name: 'Test Ship',
        model: 'TEST-001',
        crew: 100,
        status: 'operational',
      };

      const ship1 = service.create(createDto);
      const ship2 = service.create(createDto);

      expect(ship1.id).not.toBe(ship2.id);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un vaisseau existant', () => {
      const starships = service.findAll();
      const starshipToUpdate = starships[0];

      const updateDto: UpdateStarshipDto = {
        status: 'maintenance',
        crew: 1500,
      };

      const result = service.update(starshipToUpdate.id, updateDto);

      expect(result.id).toBe(starshipToUpdate.id);
      expect(result.status).toBe(updateDto.status);
      expect(result.crew).toBe(updateDto.crew);
      expect(result.name).toBe(starshipToUpdate.name); // Les propriétés non modifiées restent inchangées
    });

    it("devrait lever une NotFoundException si le vaisseau n'existe pas", () => {
      const updateDto: UpdateStarshipDto = {
        status: 'maintenance',
      };

      expect(() => service.update('id-inexistant', updateDto)).toThrow(
        NotFoundException,
      );
    });

    it('devrait mettre à jour seulement les propriétés fournies', () => {
      const starships = service.findAll();
      const starshipToUpdate = starships[0];

      const updateDto: UpdateStarshipDto = {
        status: 'damaged',
      };

      const result = service.update(starshipToUpdate.id, updateDto);

      expect(result.status).toBe(updateDto.status);
      expect(result.name).toBe(starshipToUpdate.name);
      expect(result.model).toBe(starshipToUpdate.model);
      expect(result.crew).toBe(starshipToUpdate.crew);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un vaisseau existant', () => {
      const starships = service.findAll();
      const starshipToDelete = starships[0];
      const initialCount = starships.length;

      service.remove(starshipToDelete.id);

      expect(service.findAll().length).toBe(initialCount - 1);
      expect(() => service.findOne(starshipToDelete.id)).toThrow(
        NotFoundException,
      );
    });

    it("devrait lever une NotFoundException si le vaisseau n'existe pas", () => {
      expect(() => service.remove('id-inexistant')).toThrow(NotFoundException);
    });
  });
});
