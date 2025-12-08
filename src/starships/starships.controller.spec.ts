import { Test, TestingModule } from '@nestjs/testing';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';

describe('StarshipsController', () => {
  let controller: StarshipsController;
  let service: StarshipsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StarshipsController],
      providers: [StarshipsService],
    }).compile();

    controller = module.get<StarshipsController>(StarshipsController);
    service = module.get<StarshipsService>(StarshipsService);
  });

  it('devrait être défini', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('devrait retourner un tableau de vaisseaux', () => {
      const result = controller.findAll();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un vaisseau par son id', () => {
      const starships = service.findAll();
      const firstStarship = starships[0];
      const result = controller.findOne(firstStarship.id);
      expect(result).toEqual(firstStarship);
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

      const result = controller.create(createDto);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(createDto.name);
    });
  });

  describe('update', () => {
    it('devrait mettre à jour un vaisseau', () => {
      const starships = service.findAll();
      const starshipToUpdate = starships[0];

      const updateDto: UpdateStarshipDto = {
        status: 'maintenance',
      };

      const result = controller.update(starshipToUpdate.id, updateDto);
      expect(result.status).toBe(updateDto.status);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un vaisseau', () => {
      const starships = service.findAll();
      const starshipToDelete = starships[0];
      const initialCount = starships.length;

      controller.remove(starshipToDelete.id);
      expect(service.findAll().length).toBe(initialCount - 1);
    });
  });
});
